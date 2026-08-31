"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeCloudEffect() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Mouse tracking & velocity for tight cursor cut-through
    const mouse = {
      x: 0.5,
      y: 0.5,
      targetX: 0.5,
      targetY: 0.5,
      speed: 0,
      targetSpeed: 0,
      prevX: 0.5,
      prevY: 0.5,
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;

      const dx = x - mouse.prevX;
      const dy = y - mouse.prevY;
      mouse.targetSpeed = Math.min(Math.sqrt(dx * dx + dy * dy) * 25.0, 2.0);

      mouse.targetX = x;
      mouse.targetY = y;
      mouse.prevX = x;
      mouse.prevY = y;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = (touch.clientX - rect.left) / rect.width;
        const y = 1.0 - (touch.clientY - rect.top) / rect.height;

        const dx = x - mouse.prevX;
        const dy = y - mouse.prevY;
        mouse.targetSpeed = Math.min(Math.sqrt(dx * dx + dy * dy) * 25.0, 2.0);

        mouse.targetX = x;
        mouse.targetY = y;
        mouse.prevX = x;
        mouse.prevY = y;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Multi-Layer Volumetric Saturated Cloud Shader with Tight Cursor Cut-Through
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_mouse_speed;
      uniform float u_time;
      uniform float u_aspect;

      // 2D Simplex Noise generator
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187,
                            0.366025403784439,
                           -0.577350269189626,
                            0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      // Multi-octave FBM for dense, saturated clouds
      float fbm(vec2 p, int octaves) {
        float total = 0.0;
        float amp = 0.58;
        float freq = 1.0;
        for (int i = 0; i < 5; i++) {
          if (i >= octaves) break;
          total += snoise(p * freq) * amp;
          freq *= 2.02;
          amp *= 0.52;
        }
        return total;
      }

      void main() {
        vec2 uv = vUv;
        vec2 aspectUv = vec2(uv.x * u_aspect, uv.y);
        vec2 aspectMouse = vec2(u_mouse.x * u_aspect, u_mouse.y);

        // Small, Tight Cursor Interaction Field
        float distToMouse = distance(aspectUv, aspectMouse);
        vec2 mouseDir = aspectUv - aspectMouse;
        float mouseSwirl = (1.0 - smoothstep(0.0, 0.12, distToMouse)) * (0.05 + u_mouse_speed * 0.05);

        // Horizontally balanced volumetric smoke ceiling across full width (left matches right)
        float maxAllowedHeight = 0.40 + 0.03 * sin(uv.x * 3.14159);
        float verticalBase = smoothstep(maxAllowedHeight, maxAllowedHeight - 0.14, uv.y) * smoothstep(0.0, 0.02, uv.y);

        float t = u_time * 0.038;

        // =========================================================================
        // LAYER 1: Deep Horizon Foundation (Dense, slow rolling dark base)
        // =========================================================================
        vec2 uv1 = uv * vec2(1.1, 0.9) + vec2(t * 0.12, t * 0.05) + normalize(mouseDir + 0.001) * (mouseSwirl * 0.25);
        float cut1 = smoothstep(0.015, 0.075, distToMouse);
        float n1 = fbm(uv1, 3);
        float density1 = smoothstep(-0.4, 0.55, n1) * verticalBase * 0.85 * cut1;
        vec3 color1 = vec3(0.06, 0.06, 0.07);

        // =========================================================================
        // LAYER 2: Heavy Stratus Pillows (Thick billowing smoke bodies)
        // =========================================================================
        vec2 uv2 = uv * vec2(1.7, 1.3) + vec2(-t * 0.18, t * 0.08) + normalize(mouseDir + 0.001) * (mouseSwirl * 0.4);
        float cut2 = smoothstep(0.02, 0.085, distToMouse);
        float n2 = fbm(uv2 + n1 * 0.3, 4);
        float density2 = smoothstep(-0.3, 0.55, n2) * verticalBase * 0.95 * cut2;
        vec3 color2 = mix(vec3(0.18, 0.18, 0.21), vec3(0.38, 0.38, 0.43), smoothstep(0.1, 0.55, density2));

        // =========================================================================
        // LAYER 3: Saturated Volumetric Cumulus (Dense 3D cloud clusters)
        // =========================================================================
        vec2 uv3 = uv * vec2(2.4, 1.8) + vec2(t * 0.28, -t * 0.04) + normalize(mouseDir + 0.001) * (mouseSwirl * 0.6);
        float cut3 = smoothstep(0.025, 0.095, distToMouse);
        float n3 = fbm(uv3 + n2 * 0.35, 4);
        float density3 = smoothstep(-0.25, 0.60, n3) * verticalBase * 1.15 * cut3;
        vec3 color3 = mix(vec3(0.42, 0.42, 0.48), vec3(0.72, 0.72, 0.80), smoothstep(0.15, 0.65, density3));

        // =========================================================================
        // LAYER 4: Dynamic Smoke Tendrils & Ribbons (Rich silver highlights)
        // =========================================================================
        vec2 uv4 = uv * vec2(3.5, 2.6) + vec2(-t * 0.42, t * 0.14) + normalize(mouseDir + 0.001) * (mouseSwirl * 0.8);
        float cut4 = smoothstep(0.03, 0.105, distToMouse);
        float n4 = fbm(uv4 + n3 * 0.4, 4);
        float density4 = smoothstep(-0.1, 0.68, n4) * verticalBase * 0.95 * cut4;
        vec3 color4 = mix(vec3(0.68, 0.68, 0.75), vec3(0.92, 0.92, 0.98), smoothstep(0.25, 0.75, density4));

        // =========================================================================
        // LAYER 5: Brilliant Foreground Mist (Crisp white foreground vapor)
        // =========================================================================
        vec2 uv5 = uv * vec2(4.8, 3.6) + vec2(t * 0.6, t * 0.22) + normalize(mouseDir + 0.001) * (mouseSwirl * 1.0);
        float cut5 = smoothstep(0.035, 0.115, distToMouse);
        float n5 = fbm(uv5 + n4 * 0.3, 3);
        float density5 = smoothstep(0.05, 0.75, n5) * verticalBase * 0.80 * cut5;
        vec3 color5 = vec3(0.98, 0.98, 1.0);

        // =========================================================================
        // SATURATED VOLUMETRIC COMPOSITING
        // =========================================================================
        vec3 finalColor = color1;
        float finalAlpha = density1;

        finalColor = mix(finalColor, color2, density2 / (finalAlpha + density2 + 0.001));
        finalAlpha = clamp(finalAlpha + density2 * (1.0 - finalAlpha * 0.4), 0.0, 1.0);

        finalColor = mix(finalColor, color3, density3 / (finalAlpha + density3 + 0.001));
        finalAlpha = clamp(finalAlpha + density3 * (1.0 - finalAlpha * 0.3), 0.0, 1.0);

        finalColor = mix(finalColor, color4, density4 / (finalAlpha + density4 + 0.001));
        finalAlpha = clamp(finalAlpha + density4 * (1.0 - finalAlpha * 0.25), 0.0, 1.0);

        finalColor = mix(finalColor, color5, density5 / (finalAlpha + density5 + 0.001));
        finalAlpha = clamp(finalAlpha + density5 * (1.0 - finalAlpha * 0.2), 0.0, 1.0);

        // Razor-sharp edge illumination along tight cursor cut
        float rimLight = smoothstep(0.04, 0.005, abs(distToMouse - 0.075)) * (0.35 + u_mouse_speed * 0.45);
        finalColor += vec3(rimLight);

        // High-density saturated output alpha
        float outputAlpha = clamp(finalAlpha * 1.25, 0.0, 0.97);

        gl_FragColor = vec4(finalColor, outputAlpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(width, height) },
        u_aspect: { value: width / height },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_mouse_speed: { value: 0 },
      },
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;

      renderer.setSize(newWidth, newHeight);
      material.uniforms.u_resolution.value.set(newWidth, newHeight);
      material.uniforms.u_aspect.value = newWidth / newHeight;
    };

    window.addEventListener("resize", handleResize);

    // Smooth Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      material.uniforms.u_time.value = elapsedTime;

      // Tight responsive cursor tracking
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;
      mouse.speed += (mouse.targetSpeed - mouse.speed) * 0.1;
      mouse.targetSpeed *= 0.90;

      material.uniforms.u_mouse.value.set(mouse.x, mouse.y);
      material.uniforms.u_mouse_speed.value = mouse.speed;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[5] overflow-hidden"
      style={{ isolation: "isolate" }}
    />
  );
}

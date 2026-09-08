import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { query, queryOne } from "@/lib/db";
import {
  getDb,
  updateProfile,
  addProject,
  updateProject,
  deleteProject,
  toggleProjectFeatured,
  addSkill,
  updateSkill,
  deleteSkill,
  addExperience,
  updateExperience,
  deleteExperience,
  updateQuote,
  toggleMessageRead,
  deleteMessage,
  saveCustomTheme,
  deleteCustomTheme,
  DatabaseStore,
} from "@/lib/store";

function isUuid(val?: string): boolean {
  if (!val) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);
}

export async function GET() {
  try {
    if (process.env.DATABASE_URL) {
      try {
        const [profile, projects, skills, experiences, certifications, quote, messages, customThemes] =
          await Promise.all([
            queryOne<any>("SELECT * FROM public.profiles LIMIT 1"),
            query<any>("SELECT * FROM public.projects ORDER BY display_order ASC, created_at DESC"),
            query<any>("SELECT * FROM public.skills ORDER BY display_order ASC, created_at ASC"),
            query<any>("SELECT * FROM public.experiences ORDER BY display_order ASC, created_at ASC"),
            query<any>("SELECT * FROM public.certifications ORDER BY created_at ASC"),
            queryOne<any>("SELECT * FROM public.quotes WHERE is_active = true LIMIT 1"),
            query<any>("SELECT * FROM public.messages ORDER BY created_at DESC"),
            query<any>(
              'SELECT id, name, category, description, background, foreground, card_bg, border_color, "primary", accent, glow_color, is_active, is_custom, created_at FROM public.themes WHERE is_custom = true ORDER BY created_at ASC'
            ),
          ]);

        const dbData: DatabaseStore = {
          profile: profile
            ? { ...profile, cgpa: profile.cgpa != null ? parseFloat(profile.cgpa) : undefined }
            : getDb().profile,
          projects: projects && projects.length > 0 ? projects : getDb().projects,
          skills: skills && skills.length > 0 ? skills : getDb().skills,
          experiences: experiences && experiences.length > 0 ? experiences : getDb().experiences,
          certifications: certifications && certifications.length > 0 ? certifications : getDb().certifications,
          quote: quote || getDb().quote,
          messages: messages || [],
          customThemes: customThemes || [],
        };

        return NextResponse.json({
          success: true,
          data: dbData,
          diagnostics: {
            has_db_url: true,
            db_connected: true,
            source: "supabase_postgresql",
          },
        });
      } catch (dbErr: any) {
        console.warn("Direct PostgreSQL admin GET failed, using fallback:", dbErr);
        const db = getDb();
        return NextResponse.json({
          success: true,
          data: db,
          diagnostics: {
            has_db_url: true,
            db_connected: false,
            source: "local_json_fallback",
            error: dbErr?.message || String(dbErr),
          },
        });
      }
    }

    const db = getDb();
    return NextResponse.json({
      success: true,
      data: db,
      diagnostics: {
        has_db_url: false,
        db_connected: false,
        source: "local_json_fallback",
        error: "DATABASE_URL is not set in environment variables.",
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body;

    if (!process.env.DATABASE_URL && process.env.VERCEL) {
      return NextResponse.json(
        {
          success: false,
          error:
            "DATABASE_URL environment variable is missing on Vercel! Please add DATABASE_URL in your Vercel Project Settings and Redeploy.",
        },
        { status: 500 }
      );
    }

    let result: any = null;

    switch (action) {
      // 1. Profile
      case "update_profile":
        if (process.env.DATABASE_URL) {
          try {
            await query(
              `UPDATE public.profiles SET
                 name = COALESCE($1, name),
                 tagline = COALESCE($2, tagline),
                 bio = COALESCE($3, bio),
                 about_text = COALESCE($4, about_text),
                 location = COALESCE($5, location),
                 email = COALESCE($6, email),
                 phone = COALESCE($7, phone),
                 github_url = COALESCE($8, github_url),
                 linkedin_url = COALESCE($9, linkedin_url),
                 twitter_url = COALESCE($10, twitter_url),
                 website_url = COALESCE($11, website_url),
                 resume_url = COALESCE($12, resume_url),
                 avatar_url = COALESCE($13, avatar_url),
                 cgpa = COALESCE($14, cgpa),
                 university = COALESCE($15, university),
                 degree = COALESCE($16, degree),
                 updated_at = timezone('utc'::text, now())`,
              [
                payload.name,
                payload.tagline,
                payload.bio,
                payload.about_text,
                payload.location,
                payload.email,
                payload.phone,
                payload.github_url,
                payload.linkedin_url,
                payload.twitter_url,
                payload.website_url,
                payload.resume_url,
                payload.avatar_url,
                payload.cgpa,
                payload.university,
                payload.degree,
              ]
            );
          } catch (dbErr: any) {
            console.error("DB update_profile error:", dbErr);
            return NextResponse.json({ success: false, error: `Database error: ${dbErr?.message}` }, { status: 500 });
          }
        }
        result = updateProfile(payload);
        break;

      // 2. Projects
      case "add_project": {
        const projId = isUuid(payload.id) ? payload.id : crypto.randomUUID();
        if (process.env.DATABASE_URL) {
          try {
            await query(
              `INSERT INTO public.projects (id, title, slug, tagline, description, category, image_url, technologies, github_url, live_url, featured, display_order, architecture_details)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
              [
                projId,
                payload.title,
                payload.slug || payload.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                payload.tagline || "",
                payload.description || "",
                payload.category || "Full-Stack",
                payload.image_url || null,
                payload.technologies || [],
                payload.github_url || null,
                payload.live_url || null,
                !!payload.featured,
                payload.display_order || 0,
                payload.architecture_details || null,
              ]
            );
            payload.id = projId;
          } catch (dbErr) {
            console.warn("DB add_project error:", dbErr);
          }
        }
        result = addProject(payload);
        break;
      }

      case "update_project":
        if (process.env.DATABASE_URL) {
          try {
            await query(
              `UPDATE public.projects SET
                 title = $1, slug = $2, tagline = $3, description = $4, category = $5,
                 image_url = $6, technologies = $7, github_url = $8, live_url = $9,
                 featured = $10, display_order = $11, architecture_details = $12,
                 updated_at = timezone('utc'::text, now())
               WHERE id::text = $13`,
              [
                payload.title,
                payload.slug,
                payload.tagline,
                payload.description,
                payload.category,
                payload.image_url || null,
                payload.technologies || [],
                payload.github_url || null,
                payload.live_url || null,
                !!payload.featured,
                payload.display_order || 0,
                payload.architecture_details || null,
                payload.id,
              ]
            );
          } catch (dbErr) {
            console.warn("DB update_project error:", dbErr);
          }
        }
        result = updateProject(payload);
        break;

      case "delete_project":
        if (process.env.DATABASE_URL) {
          try {
            await query(`DELETE FROM public.projects WHERE id::text = $1`, [payload.id]);
          } catch (dbErr) {
            console.warn("DB delete_project error:", dbErr);
          }
        }
        result = deleteProject(payload.id);
        break;

      case "toggle_project_featured":
        if (process.env.DATABASE_URL) {
          try {
            await query(
              `UPDATE public.projects SET featured = NOT featured, updated_at = timezone('utc'::text, now()) WHERE id::text = $1`,
              [payload.id]
            );
          } catch (dbErr) {
            console.warn("DB toggle_project_featured error:", dbErr);
          }
        }
        result = toggleProjectFeatured(payload.id);
        break;

      // 3. Skills
      case "add_skill": {
        const skillId = isUuid(payload.id) ? payload.id : crypto.randomUUID();
        if (process.env.DATABASE_URL) {
          try {
            await query(
              `INSERT INTO public.skills (id, name, category, proficiency, experience_years, icon_name, featured, display_order)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
              [
                skillId,
                payload.name,
                payload.category,
                payload.proficiency || 85,
                payload.experience_years || "2+ yrs",
                payload.icon_name || null,
                payload.featured !== false,
                payload.display_order || 0,
              ]
            );
            payload.id = skillId;
          } catch (dbErr) {
            console.warn("DB add_skill error:", dbErr);
          }
        }
        result = addSkill(payload);
        break;
      }

      case "update_skill":
        if (process.env.DATABASE_URL) {
          try {
            await query(
              `UPDATE public.skills SET
                 name = $1, category = $2, proficiency = $3, experience_years = $4,
                 icon_name = $5, featured = $6, display_order = $7
               WHERE id::text = $8`,
              [
                payload.name,
                payload.category,
                payload.proficiency,
                payload.experience_years,
                payload.icon_name || null,
                !!payload.featured,
                payload.display_order || 0,
                payload.id,
              ]
            );
          } catch (dbErr) {
            console.warn("DB update_skill error:", dbErr);
          }
        }
        result = updateSkill(payload);
        break;

      case "delete_skill":
        if (process.env.DATABASE_URL) {
          try {
            await query(`DELETE FROM public.skills WHERE id::text = $1`, [payload.id]);
          } catch (dbErr) {
            console.warn("DB delete_skill error:", dbErr);
          }
        }
        result = deleteSkill(payload.id);
        break;

      // 4. Experience
      case "add_experience": {
        const expId = isUuid(payload.id) ? payload.id : crypto.randomUUID();
        if (process.env.DATABASE_URL) {
          try {
            await query(
              `INSERT INTO public.experiences (id, company, role, location, period, description, achievements, technologies, display_order)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
              [
                expId,
                payload.company,
                payload.role,
                payload.location || null,
                payload.period,
                payload.description,
                payload.achievements || [],
                payload.technologies || [],
                payload.display_order || 0,
              ]
            );
            payload.id = expId;
          } catch (dbErr) {
            console.warn("DB add_experience error:", dbErr);
          }
        }
        result = addExperience(payload);
        break;
      }

      case "update_experience":
        if (process.env.DATABASE_URL) {
          try {
            await query(
              `UPDATE public.experiences SET
                 company = $1, role = $2, location = $3, period = $4, description = $5,
                 achievements = $6, technologies = $7, display_order = $8
               WHERE id::text = $9`,
              [
                payload.company,
                payload.role,
                payload.location || null,
                payload.period,
                payload.description,
                payload.achievements || [],
                payload.technologies || [],
                payload.display_order || 0,
                payload.id,
              ]
            );
          } catch (dbErr) {
            console.warn("DB update_experience error:", dbErr);
          }
        }
        result = updateExperience(payload);
        break;

      case "delete_experience":
        if (process.env.DATABASE_URL) {
          try {
            await query(`DELETE FROM public.experiences WHERE id::text = $1`, [payload.id]);
          } catch (dbErr) {
            console.warn("DB delete_experience error:", dbErr);
          }
        }
        result = deleteExperience(payload.id);
        break;

      // 5. Quote
      case "update_quote":
        if (process.env.DATABASE_URL) {
          try {
            await query(
              `UPDATE public.quotes SET
                 handle = $1, line1 = $2, line2 = $3, line3 = $4, line4_a = $5, line4_b = $6,
                 line5 = $7, subtext = $8, author = $9, updated_at = timezone('utc'::text, now())
               WHERE id = 'quote-main'`,
              [
                payload.handle,
                payload.line1,
                payload.line2,
                payload.line3,
                payload.line4_a,
                payload.line4_b,
                payload.line5,
                payload.subtext,
                payload.author || null,
              ]
            );
          } catch (dbErr) {
            console.warn("DB update_quote error:", dbErr);
          }
        }
        result = updateQuote(payload);
        break;

      // 6. Messages
      case "toggle_message_read":
        if (process.env.DATABASE_URL) {
          try {
            await query(
              `UPDATE public.messages SET read = NOT read WHERE id::text = $1`,
              [payload.id]
            );
          } catch (dbErr) {
            console.warn("DB toggle_message_read error:", dbErr);
          }
        }
        result = toggleMessageRead(payload.id);
        break;

      case "delete_message":
        if (process.env.DATABASE_URL) {
          try {
            await query(`DELETE FROM public.messages WHERE id::text = $1`, [payload.id]);
          } catch (dbErr) {
            console.warn("DB delete_message error:", dbErr);
          }
        }
        result = deleteMessage(payload.id);
        break;

      // 7. Custom Themes
      case "save_custom_theme":
        if (process.env.DATABASE_URL) {
          try {
            await query(
              `INSERT INTO public.themes (id, name, category, description, background, foreground, card_bg, border_color, "primary", accent, glow_color, is_active, is_custom)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, true)
               ON CONFLICT (id) DO UPDATE SET
                 name = EXCLUDED.name, category = EXCLUDED.category, description = EXCLUDED.description,
                 background = EXCLUDED.background, foreground = EXCLUDED.foreground, card_bg = EXCLUDED.card_bg,
                 border_color = EXCLUDED.border_color, "primary" = EXCLUDED."primary", accent = EXCLUDED.accent,
                 glow_color = EXCLUDED.glow_color`,
              [
                payload.id,
                payload.name,
                payload.category,
                payload.description,
                payload.background,
                payload.foreground,
                payload.card_bg,
                payload.border_color,
                payload.primary,
                payload.accent,
                payload.glow_color,
                !!payload.is_active,
              ]
            );
          } catch (dbErr) {
            console.warn("DB save_custom_theme error:", dbErr);
          }
        }
        result = saveCustomTheme(payload);
        break;

      case "delete_custom_theme":
        if (process.env.DATABASE_URL) {
          try {
            await query(`DELETE FROM public.themes WHERE id = $1`, [payload.id]);
          } catch (dbErr) {
            console.warn("DB delete_custom_theme error:", dbErr);
          }
        }
        result = deleteCustomTheme(payload.id);
        break;

      case "set_active_theme":
        if (process.env.DATABASE_URL) {
          try {
            await query(`UPDATE public.themes SET is_active = false WHERE id != 'none'`);
            await query(`UPDATE public.themes SET is_active = true WHERE id = $1`, [payload.id]);
          } catch (dbErr) {
            console.warn("DB set_active_theme error:", dbErr);
          }
        }
        result = { success: true };
        break;

      default:
        return NextResponse.json({ success: false, error: `Unknown action: ${action}` }, { status: 400 });
    }

    // Invalidate server cache for home page and layout so changes go live immediately
    try {
      revalidatePath("/", "layout");
      revalidatePath("/");
    } catch (revalErr) {
      console.warn("revalidatePath skipped in dev:", revalErr);
    }

    return NextResponse.json({ success: true, data: result });
  } catch (err: any) {
    console.error("Admin data API error:", err);
    return NextResponse.json({ success: false, error: err?.message || "Internal server error" }, { status: 500 });
  }
}

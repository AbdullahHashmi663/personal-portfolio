import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
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
} from "@/lib/store";

export async function GET() {
  try {
    const db = getDb();
    return NextResponse.json({ success: true, data: db });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, payload } = body;

    let result: any = null;

    switch (action) {
      // 1. Profile
      case "update_profile":
        result = updateProfile(payload);
        break;

      // 2. Projects
      case "add_project":
        result = addProject(payload);
        break;
      case "update_project":
        result = updateProject(payload);
        break;
      case "delete_project":
        result = deleteProject(payload.id);
        break;
      case "toggle_project_featured":
        result = toggleProjectFeatured(payload.id);
        break;

      // 3. Skills
      case "add_skill":
        result = addSkill(payload);
        break;
      case "update_skill":
        result = updateSkill(payload);
        break;
      case "delete_skill":
        result = deleteSkill(payload.id);
        break;

      // 4. Experience
      case "add_experience":
        result = addExperience(payload);
        break;
      case "update_experience":
        result = updateExperience(payload);
        break;
      case "delete_experience":
        result = deleteExperience(payload.id);
        break;

      // 5. Quote
      case "update_quote":
        result = updateQuote(payload);
        break;

      // 6. Messages
      case "toggle_message_read":
        result = toggleMessageRead(payload.id);
        break;
      case "delete_message":
        result = deleteMessage(payload.id);
        break;

      // 7. Custom Themes
      case "save_custom_theme":
        result = saveCustomTheme(payload);
        break;
      case "delete_custom_theme":
        result = deleteCustomTheme(payload.id);
        break;

      default:
        return NextResponse.json({ success: false, error: `Unknown action: ${action}` }, { status: 400 });
    }

    // Invalidate server cache for home page so changes go live immediately
    try {
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

import { Field } from "../../model/Field";
import FieldService from "../../services/fieldService";

export async function FieldEditLoader({
  request,
}: {
  request: Request;
}): Promise<{ field: Field; parent?: Field }> {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");
  const field_path = searchParams.get("field_path");
  const parent_path = searchParams.get("parent_path");

  if (!path) {
    throw new Response("File path cannot be empty", { status: 404 });
  }
  if (!field_path) {
    throw new Response("Field path cannot be empty", { status: 404 });
  }

  try {
    const field: Field = await FieldService.getField(field_path, path);
    let parent: Field | undefined = undefined;
    if (parent_path) {
      parent = await FieldService.getField(parent_path, path);
    }
    return { field, parent };
  } catch (error) {
    console.error("Error loading field:", error);
    throw new Response("Failed to load field", { status: 404 });
  }
}

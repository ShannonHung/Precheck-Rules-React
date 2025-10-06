import { Field } from "../../model/Field";
import { ParentField } from "../../model/ParentField";
import FieldService from "../../services/fieldService";

export function FieldListLoader({
  request,
}: {
  request: Request;
}): Promise<{ fields: Field[]; parentFields: ParentField[] }> {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  if (!path) {
    throw new Response("Path cannot be empty", { status: 404 });
  }

  return Promise.all([
    FieldService.getFieldsByPath(path),
    FieldService.getParentFields(path),
  ])
    .then(([fields, parentFields]) => {
      return { fields, parentFields };
    })
    .catch((error) => {
      console.error("Error loading fields:", error);
      throw new Response("Failed to load fields", { status: 404 });
    });
}

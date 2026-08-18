import { PDFCheckBox, PDFDocument, PDFDropdown, PDFRadioGroup, PDFTextField } from "pdf-lib";

export type FormField =
  | { kind: "text"; name: string; value: string }
  | { kind: "checkbox"; name: string; checked: boolean }
  | { kind: "radio"; name: string; options: string[]; value: string }
  | { kind: "dropdown"; name: string; options: string[]; value: string };

/** Buttons and multi-select option lists are skipped — not a fillable single value. */
export async function readFormFields(file: File): Promise<FormField[]> {
  const doc = await PDFDocument.load(await file.arrayBuffer());
  const fields = doc.getForm().getFields();
  const out: FormField[] = [];

  for (const f of fields) {
    const name = f.getName();
    if (f instanceof PDFTextField) out.push({ kind: "text", name, value: f.getText() ?? "" });
    else if (f instanceof PDFCheckBox) out.push({ kind: "checkbox", name, checked: f.isChecked() });
    else if (f instanceof PDFRadioGroup) out.push({ kind: "radio", name, options: f.getOptions(), value: f.getSelected() ?? "" });
    else if (f instanceof PDFDropdown) out.push({ kind: "dropdown", name, options: f.getOptions(), value: f.getSelected()[0] ?? "" });
  }
  return out;
}

/** Fills every named field and, by default, flattens the form so the values become permanent page content. */
export async function fillPdfForm(
  file: File,
  values: Record<string, string | boolean>,
  flatten: boolean,
): Promise<Blob> {
  const doc = await PDFDocument.load(await file.arrayBuffer());
  const form = doc.getForm();

  for (const [name, value] of Object.entries(values)) {
    const field = form.getFieldMaybe(name);
    if (!field) continue;
    if (field instanceof PDFTextField) field.setText(String(value));
    else if (field instanceof PDFCheckBox) {
      if (value) field.check();
      else field.uncheck();
    }
    else if (field instanceof PDFRadioGroup && value) field.select(String(value));
    else if (field instanceof PDFDropdown && value) field.select(String(value));
  }
  if (flatten) form.flatten();

  const bytes = await doc.save();
  return new Blob([bytes.slice().buffer], { type: "application/pdf" });
}

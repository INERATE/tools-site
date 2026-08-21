import { rgb, type PDFDocument, type PDFPage } from "pdf-lib";
import { addSignatureField } from "./signature-field";
import type { Annotation, BoxLike } from "../annotation-types";

export type FormFieldKind = "text-field" | "checkbox" | "sig-field";
const KINDS = new Set<string>(["text-field", "checkbox", "sig-field"]);

/** Narrowed to the field kinds only — widening to BoxLike would make the
 *  negated branch exclude every other box annotation as well. */
export const isFormField = (a: Annotation): a is BoxLike & { kind: FormFieldKind } =>
  KINDS.has(a.kind);

/** Fractional, top-left box -> PDF points, bottom-left. */
function rectOf(b: BoxLike, page: PDFPage) {
  const { width, height } = page.getSize();
  const w = b.relWidth * width;
  const h = b.relHeight * height;
  return { x: b.relX * width, y: height - b.relY * height - h, width: w, height: h };
}

/**
 * Turns placed field boxes into real AcroForm widgets, so the exported PDF is
 * genuinely fillable in Acrobat or a browser viewer rather than carrying a
 * picture of a form.
 *
 * Names must be unique across the document — AcroForm treats two fields of the
 * same name as one field sharing a value, so a counter is appended.
 */
export function drawFormFields(doc: PDFDocument, pages: PDFPage[], items: Annotation[]) {
  const fields = items.filter(isFormField);
  if (!fields.length) return;

  const form = doc.getForm();
  let n = 0;

  for (const b of fields) {
    const page = pages[b.pageIndex];
    if (!page) continue;
    const name = `${b.fieldName || b.kind}_${++n}`;
    const rect = rectOf(b, page);

    if (b.kind === "text-field") {
      const f = form.createTextField(name);
      if (b.fieldLabel) f.setText(b.fieldLabel);
      f.addToPage(page, { ...rect, borderColor: rgb(0.4, 0.45, 0.55), borderWidth: 1 });
      continue;
    }

    if (b.kind === "checkbox") {
      const f = form.createCheckBox(name);
      f.addToPage(page, { ...rect, borderColor: rgb(0.4, 0.45, 0.55), borderWidth: 1 });
      continue;
    }

    addSignatureField(doc, page, name, rect);
  }
}

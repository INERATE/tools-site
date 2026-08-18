"use client";

import { useState } from "react";
import { fillPdfForm, readFormFields, type FormField } from "../lib/fill-pdf-form";

export function usePdfForm() {
  const [file, setFile] = useState<File | null>(null);
  const [fields, setFields] = useState<FormField[]>([]);
  const [values, setValues] = useState<Record<string, string | boolean>>({});
  const [flatten, setFlatten] = useState(true);
  const [busy, setBusy] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function pick(picked: File[]) {
    const pdf = picked.find((f) => f.type === "application/pdf");
    if (!pdf) return setError(picked.length ? "That file was not a PDF." : null);
    setError(null);
    setUrl(null);
    setFile(pdf);
    try {
      const found = await readFormFields(pdf);
      if (found.length === 0) return setError("No fillable fields were found in that PDF.");
      setFields(found);
      setValues(Object.fromEntries(found.map((f) => [f.name, f.kind === "checkbox" ? f.checked : f.value])));
    } catch {
      setError("Could not read that PDF's form — it may be encrypted or damaged.");
    }
  }

  function setValue(name: string, value: string | boolean) {
    setUrl(null);
    setValues((v) => ({ ...v, [name]: value }));
  }

  async function run() {
    if (!file) return;
    setBusy(true);
    try {
      const blob = await fillPdfForm(file, values, flatten);
      setUrl(URL.createObjectURL(blob));
    } catch {
      setError("Could not fill this form.");
    } finally {
      setBusy(false);
    }
  }

  return {
    file,
    fields,
    values,
    setValue,
    flatten,
    setFlatten: (v: boolean) => {
      setUrl(null);
      setFlatten(v);
    },
    busy,
    url,
    error,
    pick,
    run,
  };
}

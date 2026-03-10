import { useState, useEffect } from "react";

type FormData = {
  name: string;
  state: string;
  consumption: number;
};

const STORAGE_KEY = "form-data";

const defaultValues: FormData = {
  name: "",
  state: "",
  consumption: 0,
};

export function usePersistentForm() {
  const [formData, setFormData] = useState<FormData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultValues;
    } catch {
      return defaultValues;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function clearForm() {
    setFormData(defaultValues);
    localStorage.removeItem(STORAGE_KEY);
  }

  return { formData, updateField, clearForm };
}

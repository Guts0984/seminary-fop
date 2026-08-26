import { toast } from "sonner";

export const copyToClipboard = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value);
    toast.success("Скопійовано до буферу обміну");
  } catch {
    toast.error("Не вдалося скопіювати");
  }
};

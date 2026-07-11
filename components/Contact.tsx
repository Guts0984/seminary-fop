"use client";

import { saveEmail } from "@/features/newsletterEmails/queries/saveEmail";
import { Input } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Field } from "./ui/field";
import {
  NewsletterFormType,
  newsletterSchema,
} from "@/features/newsletterEmails/schema";

export default function Contact() {
  const phoneNumber = "+38 (050) 914 56 25";
  const email = "petrishina_t@ukr.net";

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewsletterFormType>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Скопійовано до буферу обміну");
    } catch {
      toast.error("Не вдалось скопійовати");
    }
  };

  const onSubmit = async (data: NewsletterFormType) => {
    try {
      const result = await saveEmail(data.email);

      if (!result.success) {
        toast.error(result.message ?? "Помилка підписки");
        return;
      }

      toast.success("Ви успішно підписались");
      reset();
    } catch (error) {
      console.error("Failed to save email:", error);
      toast.error("Помилка підписки");
    }
  };

  return (
    <div className="w-full flex flex-row items-center justify-between bg-[#3C3C3C] h-8 px-2 md:px-4 flex-nowrap gap-4">
      <div className="text-white flex flex-row items-center gap-3 md:gap-8 whitespace-nowrap w-full sm:w-auto justify-center sm:justify-start">
        <p className="text-[11px] md:text-sm flex items-center">
          Телефон:
          <button
            type="button"
            onClick={() => handleCopy(phoneNumber)}
            className="font-bold ml-1 text-highlight hover:text-highlight/85 transition-colors cursor-pointer"
          >
            {phoneNumber}
          </button>
        </p>
        <p className="text-[11px] md:text-sm flex items-center">
          E-mail:
          <button
            type="button"
            onClick={() => handleCopy(email)}
            className="font-bold ml-1 text-highlight hover:text-highlight/85 transition-colors cursor-pointer"
          >
            {email}
          </button>
        </p>
      </div>

      <div className="hidden sm:flex items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row items-center gap-2"
        >
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className="relative flex items-center"
              >
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="your@example.com"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                  className={`w-32 md:w-48 bg-transparent border text-gray-300 text-xs rounded-sm px-2 h-6 transition-colors focus:outline-none focus:ring-1 focus:ring-highlight placeholder:text-gray-400 ${
                    fieldState.invalid
                      ? "border-red-500"
                      : "border-gray-500 focus:border-highlight"
                  }`}
                />
                {fieldState.invalid && (
                  <span className="text-red-400 text-[10px] absolute -bottom-4 left-0 whitespace-nowrap">
                    {fieldState.error?.message}
                  </span>
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="whitespace-nowrap h-6 px-3 py-0 text-[11px] md:text-xs min-h-0 flex items-center justify-center hover:cursor-pointer rounded-sm w-28"
          >
            {isSubmitting ? "..." : "Підписатися"}
          </Button>
        </form>
      </div>
    </div>
  );
}

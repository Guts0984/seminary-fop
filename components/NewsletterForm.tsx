"use client";

import { useState } from "react";
import { saveEmail } from "@/features/newsletterEmails/queries/saveEmail";
import {
  NewsletterFormType,
  newsletterSchema,
  categoryLabels,
  CATEGORY_VALUES,
} from "@/features/newsletterEmails/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Field } from "./ui/field";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";

export default function NewsletterForm() {
  const [modalOpen, setModalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { isSubmitting },
  } = useForm<NewsletterFormType>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "", categories: [] },
  });

  const handleOpenModal = async () => {
    const emailValid = await trigger("email"); // validate only email first
    if (emailValid) setModalOpen(true);
  };

  const onSubmit = async (data: NewsletterFormType) => {
    console.log("submitting:", data);
    try {
      const result = await saveEmail(data);
      if (!result.success) {
        toast.error(result.message ?? "Помилка підписки");
        return;
      }
      toast.success("Ви успішно підписались");
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to save email:", error);
      toast.error("Помилка підписки");
    } finally {
      reset();
    }
  };

  return (
    <div>
      <div className="hidden sm:flex items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleOpenModal();
          }}
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
                  id={field.name}
                  name={field.name}
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  type="email"
                  placeholder="your@example.com"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                  className={`w-32 md:w-48 text-gray-300 text-xs rounded-sm px-2 h-6 transition-colors focus:outline-none ${
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

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Розсилка для:</DialogTitle>
            </DialogHeader>

            <Controller
              name="categories"
              control={control}
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-2 py-4">
                  {CATEGORY_VALUES.map((value) => (
                    <label
                      key={value}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Checkbox
                        checked={field.value?.includes(value)}
                        onCheckedChange={(isChecked) => {
                          field.onChange(
                            isChecked
                              ? [...(field.value ?? []), value]
                              : field.value?.filter((v) => v !== value),
                          );
                        }}
                      />
                      {categoryLabels[value]}
                    </label>
                  ))}
                  {fieldState.invalid && (
                    <span className="text-red-400 text-xs">
                      {fieldState.error?.message}
                    </span>
                  )}
                </div>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "..." : "Підтвердити підписку"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { RegistrationFormType, registrationSchema } from "../schema";
import { saveRegistration } from "../queries/saveRegistration";

const formSchema = registrationSchema.omit({ participants: true }).extend({
  type: z.string().min(1, "Оберіть формат участі"),
  participants: z
    .array(
      z.object({
        value: z.string().trim().min(1, "Вкажіть ім'я учасника"),
      }),
    )
    .min(1, "Оберіть хоча б одного учасника"),
});

type FormValues = z.infer<typeof formSchema>;

export type SeminarTypeOption = "seminar" | "webinar" | "recording";

const defaultTypeLabels: Record<string, string> = {
  seminar: "Очна участь (Семінар)",
  webinar: "Онлайн-участь (Вебінар)",
  recording: "Відеозапис",
};

interface RegistrationFormProps {
  seminarId: string;
  availableTypes: SeminarTypeOption[];
}

export default function RegistrationForm({
  seminarId,
  availableTypes,
}: RegistrationFormProps) {
  const defaultType = availableTypes[0] ?? "seminar";

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      seminarId,
      type: defaultType,
      name: "",
      position: "",
      company: "",
      address: "",
      phone: "",
      email: "",
      participants: [{ value: "" }],
    },
  });

  const {
    fields: participantFields,
    append: appendParticipant,
    remove: removeParticipant,
  } = useFieldArray({
    control,
    name: "participants",
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const payload: RegistrationFormType = {
        ...data,
        participants: data.participants.map((p) => p.value),
      };

      const result = await saveRegistration(payload);
      if (!result.success) {
        toast.error(result.message ?? "Помилка реєстрації");
        return;
      }

      toast.success("Реєстрацію успішно надіслано");
      reset({
        seminarId,
        type: defaultType,
        name: "",
        position: "",
        company: "",
        address: "",
        phone: "",
        email: "",
        participants: [{ value: "" }],
      });
    } catch (error) {
      console.error("Failed to save registration:", error);
      toast.error("Помилка реєстрації");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-xl space-y-6 rounded-xl border-2 border-border bg-card p-6 shadow-sm sm:p-8"
    >
      <div className="space-y-4">
        {/* Dynamic Select dropdown */}
        <Field data-invalid={!!errors.type}>
          <label htmlFor="type-trigger" className="text-xs font-medium">
            Формат участі *
          </label>
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <SelectTrigger id="type-trigger" className="w-full">
                  <SelectValue placeholder="Оберіть формат участі" />
                </SelectTrigger>
                <SelectContent>
                  {availableTypes.map((typeKey) => (
                    <SelectItem key={typeKey} value={typeKey}>
                      {defaultTypeLabels[typeKey] ?? typeKey}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && (
            <span className="text-xs text-destructive">
              {errors.type.message}
            </span>
          )}
        </Field>

        <Field data-invalid={!!errors.name}>
          <label htmlFor="name" className="text-xs font-medium">
            Контактна особа *
          </label>
          <Input
            id="name"
            placeholder="ПІБ контактної особи"
            {...register("name")}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <span className="text-xs text-destructive">
              {errors.name.message}
            </span>
          )}
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.position}>
            <label
              htmlFor="position"
              className="text-xs font-medium text-muted-foreground"
            >
              Посада *
            </label>
            <Input
              id="position"
              placeholder="Головний бухгалтер"
              {...register("position")}
              aria-invalid={!!errors.position}
            />
            {errors.position && (
              <span className="text-xs text-destructive">
                {errors.position.message}
              </span>
            )}
          </Field>

          <Field data-invalid={!!errors.company}>
            <label
              htmlFor="company"
              className="text-xs font-medium text-muted-foreground"
            >
              Компанія *
            </label>
            <Input
              id="company"
              placeholder='ТОВ "Агропром"'
              {...register("company")}
              aria-invalid={!!errors.company}
            />
            {errors.company && (
              <span className="text-xs text-destructive">
                {errors.company.message}
              </span>
            )}
          </Field>
        </div>

        <Field data-invalid={!!errors.address}>
          <label
            htmlFor="address"
            className="text-xs font-medium text-muted-foreground"
          >
            Адреса для актів *
          </label>
          <Input
            id="address"
            placeholder="Місто, вулиця, будинок, офіс"
            {...register("address")}
            aria-invalid={!!errors.address}
          />
          {errors.address && (
            <span className="text-xs text-destructive">
              {errors.address.message}
            </span>
          )}
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field data-invalid={!!errors.phone}>
            <label
              htmlFor="phone"
              className="text-xs font-medium text-muted-foreground"
            >
              Телефон *
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="+380 XX XXX XX XX"
              {...register("phone")}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && (
              <span className="text-xs text-destructive">
                {errors.phone.message}
              </span>
            )}
          </Field>

          <Field data-invalid={!!errors.email}>
            <label
              htmlFor="email"
              className="text-xs font-medium text-muted-foreground"
            >
              Email *
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@example.com"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <span className="text-xs text-destructive">
                {errors.email.message}
              </span>
            )}
          </Field>
        </div>
      </div>

      <hr className="border-border" />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Учасники</span>
          <span className="text-xs text-muted-foreground">
            Всього: {participantFields.length}
          </span>
        </div>

        <div className="space-y-2">
          {participantFields.map((field, index) => (
            <Field
              key={field.id}
              data-invalid={!!errors.participants?.[index]?.value}
            >
              <div className="flex items-center gap-2">
                <Input
                  placeholder={`ПІБ учасника ${index + 1}`}
                  {...register(`participants.${index}.value`)}
                  aria-invalid={!!errors.participants?.[index]?.value}
                />
                {participantFields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="shrink-0 text-muted-foreground transition-colors hover:text-destructive"
                    onClick={() => removeParticipant(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {errors.participants?.[index]?.value && (
                <span className="text-xs text-destructive">
                  {errors.participants[index]?.value?.message}
                </span>
              )}
            </Field>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
          onClick={() => appendParticipant({ value: "" })}
        >
          <Plus className="mr-2 h-4 w-4" />
          Додати учасника
        </Button>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full font-medium"
      >
        {isSubmitting ? "Надсилання..." : "Підтвердити реєстрацію"}
      </Button>
    </form>
  );
}

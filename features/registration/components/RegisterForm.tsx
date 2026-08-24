"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerForSeminar } from "../queries/registerForSeminar";

interface RegisterFormProps {
  seminarSlug: string;
}

export function RegisterForm({ seminarSlug }: RegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      seminarSlug,
    },
  });

  const onSubmit = async (data: unknown) => {
    try {
      await registerForSeminar(data);
      alert("Успішно зареєстровано!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md"
    >
      <div>
        <input {...register("fullName")} placeholder="ПІБ" className="input" />
        {errors.fullName && (
          <p className="text-red-500 text-xs">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <input {...register("email")} placeholder="Email" className="input" />
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input {...register("phone")} placeholder="Телефон" className="input" />
        {errors.phone && (
          <p className="text-red-500 text-xs">{errors.phone.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary">
        {isSubmitting ? "Надсилання..." : "Зареєструватися"}
      </button>
    </form>
  );
}

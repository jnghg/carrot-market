// form 테스트

import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

// Less code
// Better validation
// Better Errors (set, clear, display)
// Have control over inputs
// Don't deal with events
// Easier Inputs

interface LoginForm {
  username: string;
  password: string;
  email: string;
  errors?: string;
}

export default function Forms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<LoginForm>({
    mode: "onChange",
  });

  const onValie = () => {
    console.log("valid!!");
    setError("errors", { message: "error!!!!" });
  };

  const onInvalid = (errors: FieldErrors) => {
    console.log("Invalid !!!! ", errors);
  };

  console.log(watch("email"));
  return (
    <form onSubmit={handleSubmit(onValie, onInvalid)}>
      <input
        {...register("username", {
          required: "username is required",
          minLength: {
            message: "the username should be longer than 5 chars",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register("email", {
          required: "email is required",
          validate: {
            notGmail: (value) =>
              !value.includes("@gmail.com") || "Gmail is not allowed",
          },
        })}
        type="email"
        placeholder="Email"
        className={`${Boolean(errors.email) ? "border-red-500" : ""}`}
      />
      {errors.email?.message}
      <input
        {...register("password", {
          required: "password is required",
        })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" placeholder="Create Account" />
    </form>
  );
}

import React from "react";
import { useForm } from "react-hook-form";
import ApiService from "./ApiService";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    ApiService("http://localhost:3001/submit", "POST", data)
      .then((message) => {
        alert(message);
        reset();
      })
      .catch((error) => {
        console.error("API call error", error);
      });
  };

  return (
    <form className="regForm" onSubmit={handleSubmit(onSubmit)}>
      <h1>Registration Form</h1>

      <input
        type="text"
        placeholder="First Name"
        {...register("firstName", { required: "First Name is required" })}
      />
      {errors.firstName && <span>{errors.firstName.message}</span>}

      <input
        type="text"
        placeholder="Last Name"
        {...register("lastName", { required: "Last Name is required" })}
      />
      {errors.lastName && <span>{errors.lastName.message}</span>}

      <input
        type="email"
        placeholder="Email Address"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Email is not valid",
          },
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}

      <input
        type="password"
        placeholder="Password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 5,
            message: "Password should be at least 5 characters",
          },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}

      <input
        type="password"
        placeholder="Confirm Password"
        {...register("conPassword", {
          required: "Confirm Password is required",
          validate: (value) =>
            value === document.querySelector('input[name="password"]').value ||
            "Passwords do not match",
        })}
      />
      {errors.conPassword && <span>{errors.conPassword.message}</span>}

      <button type="submit">Submit</button>
    </form>
  );
}

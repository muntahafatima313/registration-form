import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ApiService from "./ApiService";
import { Box, Typography, TextField, Button,Alert } from "@mui/material";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [alert,setAlert]=useState({message:"",type:""})
  const onSubmit = (data) => {
    ApiService("http://localhost:3001/submit", "POST", data)
      .then((message) => {
        setAlert({message:"Registration Successful!",type:"success"})
        reset();
      })
      .catch((error) => {
        setAlert({message:"API Call failed. Please try again",type:"error"})
        console.error("API call error", error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url(background.webp)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        component="form"
        className="regForm"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "350px",
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          color="blue"
          margin="auto"
        >
          Registration Form
        </Typography>

        {alert.message && (
          <Alert severity={alert.type} onClose={()=>setAlert({message:"",type:""})}>
            {alert.message}
          </Alert>
        )}
        <TextField
          label="First Name"
          variant="outlined"
          {...register("firstName", { required: "First Name is required" })}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        ></TextField>

        <TextField
          label="Last Name"
          variant="outlined"
          {...register("lastName", { required: "Last Name is required" })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />

        <TextField
          label="Email Address"
          type="email"
          variant="outlined"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Email is not valid",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type="password"
          variant="outlined"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Password should be at least 5 characters",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          {...register("conPassword", {
            required: "Confirm Password is required",
            validate: (value) =>
              value ===
                document.querySelector('input[name="password"]').value ||
              "Passwords do not match",
          })}
          error={!!errors.conPassword}
          helperText={errors.conPassword?.message}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    </div>
  );
}

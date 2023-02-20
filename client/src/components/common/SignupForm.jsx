import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { setUser } from "../../redux/features/userSlice";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { Box, Stack } from "@mui/system";
import { Alert, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import userApi from "../../api/modules/user.api";

const SignupForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signupForm = useFormik({
    initialValues: {
      username: "",
      displayName: "",
      password: "",
      confirmPassword: "",
    },
    validateYupSchema: Yup.object({
      username: Yup.string()
        .min(8, "username mininum 8 characters")
        .required("username is required"),
      password: Yup.string()
        .min(8, "password mininum 8 characters")
        .required("password is required"),
      displayName: Yup.string()
        .min(8, "password mininum 8 characters")
        .required("password is required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password")],
        "confirmPassword not match"
      ),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      console.log("done");
      const { response, err } = await userApi.signup(values);
      console.log(response);

      setIsLoginRequest(false);
      if (response) {
        signupForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Sign in success");
      }
      if (err) setErrorMessage(err.message);
    },
  });

  return (
    <Box component="form" onSubmit={signupForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="Username"
          name="username"
          fullWidth
          value={signupForm.values.username}
          onChange={signupForm.handleChange}
          color="success"
          error={
            signupForm.touched.username &&
            signupForm.errors.username !== undefined
          }
          helperText={signupForm.touched.username && signupForm.errors.username}
        />
        <TextField
          type="text"
          placeholder="Display name"
          name="displayName"
          fullWidth
          value={signupForm.values.displayName}
          onChange={signupForm.handleChange}
          color="success"
          error={
            signupForm.touched.displayName &&
            signupForm.errors.displayName !== undefined
          }
          helperText={
            signupForm.touched.displayName && signupForm.errors.displayName
          }
        />
        <TextField
          type="password"
          placeholder="Password"
          name="password"
          fullWidth
          value={signupForm.values.password}
          onChange={signupForm.handleChange}
          color="success"
          error={
            signupForm.touched.password &&
            signupForm.errors.password !== undefined
          }
          helperText={signupForm.touched.password && signupForm.errors.password}
        />
        <TextField
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          fullWidth
          value={signupForm.values.confirmPassword}
          onChange={signupForm.handleChange}
          color="success"
          error={
            signupForm.touched.confirmPassword &&
            signupForm.errors.confirmPassword !== undefined
          }
          helperText={
            signupForm.touched.confirmPassword &&
            signupForm.errors.confirmPassword
          }
        />
      </Stack>
      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        Sign up
      </LoadingButton>
      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        Sign in
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default SignupForm;

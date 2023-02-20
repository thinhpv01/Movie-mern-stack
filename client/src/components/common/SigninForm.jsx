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

const SigninForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signinForm = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validateYupSchema: Yup.object({
      username: Yup.string()
        .min(8, "username mininum 8 characters")
        .required("username is required"),
      password: Yup.string()
        .min(8, "password mininum 8 characters")
        .required("password is required"),
    }),
    onsubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      console.log("done");
      // const { response, error } = await userApi.signin(values);
      const { response, error } = {};
      setIsLoginRequest(false);
      if (response) {
        signinForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Sign in success");
      }
      if (error) setErrorMessage(error.message);
    },
  });

  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="Username"
          name="username"
          fullWidth
          value={signinForm.values.username}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.username &&
            signinForm.errors.username !== undefined
          }
          helperText={signinForm.touched.username && signinForm.errors.username}
        />
        <TextField
          type="password"
          placeholder="Password"
          name="password"
          fullWidth
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.password &&
            signinForm.errors.password !== undefined
          }
          helperText={signinForm.touched.password && signinForm.errors.password}
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
        Sign in
      </LoadingButton>
      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        Sign up
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

export default SigninForm;

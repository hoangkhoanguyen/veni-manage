/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";
// import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
// import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userService from "service/userService";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import validateService from "service/validateService";
import {
  setOpenErrorSnackbar,
  setNotiContent,
  setNotiTitle,
  setOpenSuccessSnackbar,
} from "redux/reducers/uiReducer";

function Cover() {
  const [userInfo, setUserInfo] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    if (isLogin) {
      navigate(-1);
    }
  }, [isLogin]);
  const handleChangeUserInfo = (key, value) => {
    // if(key ==='')
    setUserInfo({ ...userInfo, [key]: value });
  };
  const handleClickSignUp = async (e) => {
    e.preventDefault();
    const data = { ...userInfo };
    if (!validateService.isNormalLetterAndNumber(userInfo.username)) {
      dispatch(setNotiContent("Please check"));
      dispatch(setNotiTitle("Username must be only normal characters or numbers!"));
      dispatch(setOpenErrorSnackbar(true));
      return;
    }
    if (
      !validateService.isNormalName(userInfo.firstName) ||
      !validateService.isNormalName(userInfo.lastName)
    ) {
      dispatch(setNotiContent("Please check"));
      dispatch(setNotiTitle("First name and last name must not contain special characters!"));
      dispatch(setOpenErrorSnackbar(true));
      return;
    }
    if (userInfo.password !== userInfo.rePassword) {
      dispatch(setNotiContent("Please check"));
      dispatch(setNotiTitle("Your passwords do not match!"));
      dispatch(setOpenErrorSnackbar(true));
      return;
    }
    const response = await userService.signUp(data);
    console.log(response);
    if (response?.errCode === 0) {
      dispatch(setNotiContent("Congratulations!"));
      dispatch(setNotiTitle("Your account is created successfully!"));
      dispatch(setOpenSuccessSnackbar(true));
      setUserInfo({});
    } else {
      dispatch(setNotiContent("Error!"));
      dispatch(setNotiTitle(response ? response.errMsg : "Something went wrong!"));
      dispatch(setOpenErrorSnackbar(true));
    }
  };
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          {/* <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Stack component="form" role="form" onSubmit={handleClickSignUp}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Username"
                variant="standard"
                fullWidth
                value={userInfo.username}
                onChange={(e) => {
                  handleChangeUserInfo("username", e.target.value);
                }}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="First name"
                variant="standard"
                fullWidth
                value={userInfo.firstName}
                onChange={(e) => {
                  handleChangeUserInfo("firstName", e.target.value);
                }}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Last name"
                variant="standard"
                fullWidth
                value={userInfo.lastName}
                onChange={(e) => {
                  handleChangeUserInfo("lastName", e.target.value);
                }}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                value={userInfo.password}
                onChange={(e) => {
                  handleChangeUserInfo("password", e.target.value);
                }}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Confirm password"
                variant="standard"
                fullWidth
                value={userInfo.rePassword}
                onChange={(e) => {
                  handleChangeUserInfo("rePassword", e.target.value);
                }}
                required
              />
            </MDBox>
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                sign up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign in
                </MDTypography>
              </MDTypography>
            </MDBox>
          </Stack>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Cover;

import React, { useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import AsyncLocalStorage from "@createnextapp/async-local-storage";

import { useNavigate } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import styled from "styled-components";
import { registerUser } from "../../services";
import { ROUTES } from "../../constants/routes";
import withLocalContext from "../store/withLocalContext";
import { ButtonAsLink } from "../Common/ButtonAsLink";

const StyledInput = styled.input`
  margin-top: 36px !important;
  @media (max-width: 600px) {
    width: 75%;
  }
`;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [showSpinner, setShowSpinner] = useState(false);

  const storeData = async (data) => {
    try {
      await AsyncLocalStorage.setItem(
        "authorization",
        JSON.stringify({
          _id: data._id,
          expiresIn: moment().add(8, "hours"),
        })
      );
      return;
    } catch (err) {
      console.log("error setting authorization LS data", err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setShowSpinner(true);
      const res = await registerUser({ password, username });
      await storeData(res.data);
      navigate(ROUTES.LANDING_PAGE);
    } catch (error) {
      setShowSpinner(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Backdrop open={showSpinner} onClick={() => setShowSpinner(false)}>
        <CircularProgress />
      </Backdrop>
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        className="fill-height"
        spacing={3}
      >
        <Grid item xs={12}>
          <h1>Register User</h1>
        </Grid>
        <Grid item xs={12}>
          <StyledInput
            label="Username"
            type="username"
            onChange={(value) => setUsername(value.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledInput
            label="Password"
            type="password"
            onChange={(value) => setPassword(value.target.value)}
          />
        </Grid>
        <Grid container item xs={12} justifyContent={"center"} spacing={2}>
          <Grid container item xs={6} md={3} justifyContent={"center"}>
            <ButtonAsLink
              text="Go to login"
              onClick={() => navigate(ROUTES.LOGIN_IN)}
            />
          </Grid>
          <Grid container item xs={6} md={3} justifyContent={"center"}>
            <ButtonAsLink
              text="Register user"
              type="submit"
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default withLocalContext(RegisterPage);

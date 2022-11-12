import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import AsyncLocalStorage from "@createnextapp/async-local-storage";

import { Navigate, useNavigate } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import styled from "styled-components";
import { authorize, registerUser } from "../../services";
import { ROUTES } from "../../constants/routes";
import { getIsAuthorized } from "../store/selectors";
import withLocalContext from "../store/withLocalContext";

const StyledButton = styled(Button)`
  font-size: 16px !important;
  font-family: Colfax Medium;
  max-width: 200px;
`;

const StyledTextfield = styled(TextField)`
 > .MuiInputBase-root {
  margin-top: 36px !important;
 }
`;

export const LoginPage = ({ context: { state } }) => {
  const navigate = useNavigate();
  const [invalidLogin, setInvalidLogin] = useState(false);
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [showSpinner, setShowSpinner] = useState(false);

  const storeData = async (res) => {
    try {
      await AsyncLocalStorage.setItem(
        "authorization",
        JSON.stringify({
          ...res.data,
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
      // const res = await authorize({ password, username: "admin" });
      const res = await authorize({ password, username });
      await storeData(res);
      navigate(window.history.state.url);
    } catch (error) {
      setShowSpinner(false);
      setInvalidLogin(true);
    }
  };

  if (getIsAuthorized()) {
    return <Navigate replace to={ROUTES.LANDING_PAGE} />;
  }

  return (
    <form onSubmit={onSubmit} className="fill-height">
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
          <StyledTextfield
            label="Username"
            type="username"
            autoComplete="current-username"
            onChange={(value) => setUsername(value.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledTextfield
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(value) => setPassword(value.target.value)}
          />
        </Grid>
        <Grid container item xs={12} justifyContent={"center"} spacing={2}>
          <Grid item xs={3}>
            <StyledButton
              className="fill-width"
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate(ROUTES.REGISTER)}
            >
              Not a user? Register
            </StyledButton>
          </Grid>
          <Grid item xs={3}>
            <StyledButton
              className="fill-width"
              variant="contained"
              color="primary"
              size="large"
              type="submit"
            >
              Login
            </StyledButton>
          </Grid>
        </Grid>
        {invalidLogin && (
          <Grid item xs={12}>
            Invalid Password, please try again.
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default withLocalContext(LoginPage);

import React, { useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import AsyncLocalStorage from "@createnextapp/async-local-storage";

import { Navigate, useNavigate } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import styled from "styled-components";
import { authorize, getLogos } from "../../services";
import { ROUTES } from "../../constants/routes";
import { getIsAuthorized, getUserId } from "../store/selectors";
import withLocalContext from "../store/withLocalContext";
import { loadLogos } from "../store/actions";
import { ButtonAsLink } from "../Common/ButtonAsLink";

const StyledInput = styled.input`
  margin-top: 36px !important;
  @media (max-width: 600px) {
    width: 75%;
  }
`;

export const LoginPage = ({ context: { dispatch } }) => {
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
      const res = await authorize({ password, username });
      await storeData(res);
      let logoRes = await getLogos({ _id: getUserId() });
      await dispatch(loadLogos(logoRes.data));
      navigate(ROUTES.LANDING_PAGE);
    } catch (error) {
      setShowSpinner(false);
      setInvalidLogin(true);
    }
  };

  if (getIsAuthorized()) {
    return <Navigate replace to={ROUTES.LANDING_PAGE} />;
  }

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
          <h1>Login Page</h1>
        </Grid>
        <Grid item xs={12}>
          <StyledInput
            label="Username"
            type="username"
            autoComplete="current-username"
            onChange={(value) => setUsername(value.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <StyledInput
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(value) => setPassword(value.target.value)}
          />
        </Grid>
        <Grid container item xs={12} justifyContent={"center"} spacing={2}>
          <Grid container item xs={6} md={3} justifyContent={"center"}>
            <ButtonAsLink
              onClick={() => navigate(ROUTES.REGISTER)}
              text="Go to register user"
            />
          </Grid>
          <Grid container item xs={6} md={3} justifyContent={"center"}>
            <ButtonAsLink
              type="submit"
              text="Login"
            />
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

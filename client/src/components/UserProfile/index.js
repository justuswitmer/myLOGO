import { Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { ButtonAsLink } from "../Common/ButtonAsLink";
import withLocalContext from "../store/withLocalContext"
import AsyncLocalStorage from "@createnextapp/async-local-storage";
import { deleteUser, updateUser } from "../../services";
import { getUserId } from "../store/selectors";
import { Fragment, useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  margin-bottom: 20px;
  @media (max-width: 600px) {
    width: 75%;
  }
`;
const UserProfile = () => {
  const navigate = useNavigate();
  const [changePassword, setChangePassword] = useState(false);
  const [updateMsg, setUpdateMsg] = useState(false);
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();

  const logOutUser = async () => {
    try {
      await AsyncLocalStorage.removeItem("authorization");
      navigate(ROUTES.LANDING_PAGE);
      return;
    } catch (err) {
      console.log("error removing authorization LS data", err);
    }
  };

  const initDeleteUser = async () => {
    const alert = window.confirm("Are you sure you want to delete this user?");
    if (alert) {
      await deleteUser({ id: getUserId() })
      await AsyncLocalStorage.removeItem("authorization");
      navigate(ROUTES.LOGIN_IN);
    }
  }

  const changeInfo = async () => {
    try {
      const payload = {
        id: getUserId(),
        username: username,
        password: password,
      }
      await updateUser(payload);
      setUpdateMsg(true);
      setChangePassword(false);
    } catch (error) {

    }
  }
  return (
    <Grid container alignItems="center" direction="column">
      <ButtonAsLink
        text="Logout User"
        onClick={() => logOutUser()}
      />
      <ButtonAsLink
        text="Register new user"
        onClick={() => navigate(ROUTES.REGISTER)}
      />
      <ButtonAsLink
        text="Delete User"
        onClick={() => initDeleteUser()}
      />
      <ButtonAsLink
        text={"Update login info"}
        onClick={() => setChangePassword(!changePassword)}
      />
      {changePassword &&
        <Fragment>

          <Grid item xs={12}>
            <p>Username</p>
            <StyledInput
              label="Username"
              type="username"
              onChange={(value) => setUsername(value.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <p>Password</p>
            <StyledInput
              label="Password"
              type="password"
              onChange={(value) => setPassword(value.target.value)}
            />
          </Grid>

          <ButtonAsLink
            text="Save info"
            onClick={() => changeInfo()}
          />
        </Fragment>
      }
      {updateMsg &&
        <Fragment>
          <p>Info updated!</p>
          <p>Please use your new login info next time you login in.</p>
        </Fragment>
      }
    </Grid>)
}

export default withLocalContext(UserProfile);
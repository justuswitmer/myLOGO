import { Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { ButtonAsLink } from "../Common/ButtonAsLink";
import { editGallery } from "../store/actions";
import withLocalContext from "../store/withLocalContext";
import { isMobile } from "react-device-detect";
import { getIsAuthorized } from "../store/selectors";

const Header = ({ context: { state, dispatch } }) => {
  const navigate = useNavigate();

  if (!getIsAuthorized()) {
    return null;
  }
  return (
    <header>
      <Grid container alignItems="center">
        <Grid item xs={12} md={4} container justifyContent={isMobile ? "center" : "flex-start"}>
          <span className="logo">{state.editGallery ? "Edit Gallery" : "myGallery"}</span>
        </Grid>
        <Grid item xs={6} md={4} container justifyContent="center">
          <ButtonAsLink
            onClick={() => navigate(window.location.pathname === ROUTES.LANDING_PAGE ? ROUTES.USER_PROFILE : ROUTES.LANDING_PAGE)}
            text={window.location.pathname === ROUTES.LANDING_PAGE ? "User Profile" : "Gallery"}
          />
        </Grid>
        <Grid item xs={6} md={4} container justifyContent="flex-end">
          <ButtonAsLink
            onClick={() => dispatch(editGallery(!state.editGallery))}
            isDisabled={state.logos.length < 12 || window.location.pathname.includes(ROUTES.USER_PROFILE)}
            text={state.editGallery ? "View gallery" : "Edit gallery"}
          />
        </Grid>
      </Grid>
    </header>)
}
export default withLocalContext(Header);
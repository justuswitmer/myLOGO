import { Grid } from "@material-ui/core";
import { Fragment } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { getIsAuthorized } from "../store/selectors";
import withLocalContext from "../store/withLocalContext";
import AddLogo from "./AddLogo";
import GalleryEdit from "./GalleryEdit";
import GalleryView from "./GalleryView";

const Gallery = ({ context: { state, dispatch } }) => {
  return (getIsAuthorized() ?
    <Grid className="gallery-container" container spacing={3}>
      {state.editGallery ?
        <Fragment>
          <GalleryEdit />
          {state.logos.length < 12 &&
            <AddLogo />
          }
        </Fragment>
        :
        <GalleryView />
      }
    </Grid>
    :
    <Navigate to={ROUTES.LOGIN_IN} />
  );
}

export default withLocalContext(Gallery);
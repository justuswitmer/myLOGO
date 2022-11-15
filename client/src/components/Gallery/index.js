import { Grid } from "@material-ui/core";
import { Fragment } from "react";
import withLocalContext from "../store/withLocalContext";
import AddLogo from "./AddLogo";
import GalleryEdit from "./GalleryEdit";
import GalleryView from "./GalleryView";

const Gallery = ({ context: { state, dispatch } }) => {
  return (
    <Grid container spacing={3}>
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
  );
}

export default withLocalContext(Gallery);
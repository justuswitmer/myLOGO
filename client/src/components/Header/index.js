import { Grid } from "@material-ui/core";
import { editGallery } from "../store/actions";
import withLocalContext from "../store/withLocalContext";

const Header = ({ context: { state, dispatch } }) => {
  return (
    <header>
      <Grid container justifyContent="space-between" alignItems="center">
        <div>
          <span>{state.editGallery ? "Edit Gallery" : "myGallery"}</span>
        </div>
        <div>
          <button disabled={state.logos.length < 12} onClick={() => dispatch(editGallery(!state.editGallery))}>{state.editGallery ? "View gallery" : "Edit gallery"}</button>
        </div>
      </Grid>
    </header>)
}
export default withLocalContext(Header);
import withLocalContext from "../store/withLocalContext";
import GalleryItem from "./GalleryItem";
import { Fragment } from "react";
import { LogoContainer } from "../Common/LogoContainer";

const GalleryEdit = ({ context: { state } }) => {
  return (
    <Fragment>
      {state.logos.map((item, i) => (
        <LogoContainer
          key={i}
          children={<GalleryItem
            isEdit={state.editGallery}
            url={item}
            index={i}
          />}
        />
      ))}
    </Fragment>
  )
}
export default withLocalContext(GalleryEdit);
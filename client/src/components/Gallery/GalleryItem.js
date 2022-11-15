import withLocalContext from "../store/withLocalContext";

const GalleryItem = ({ context: { state }, index, url }) => {

  return (
    url !== "" &&
    <img alt={""} src={`https://logo.clearbit.com/${url}`} />
  )
}
export default withLocalContext(GalleryItem);
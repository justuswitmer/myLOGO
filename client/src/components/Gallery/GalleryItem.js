import { Grid } from "@material-ui/core";
import { Fragment, useState } from "react";
import styled from "styled-components";
import { removeLogo } from "../../services";
import { loadLogos } from "../store/actions";
import { getUserId } from "../store/selectors";
import withLocalContext from "../store/withLocalContext";

const StyledSpan = styled.span`
  color: #d92026;
  cursor: pointer;
  font-size: 40px;
  font-weight: 500;
  border: 1px solid #d92026;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  line-height: 14px;
  transition: all .5s;
  padding-left: 1px;
  &:hover {
    transform: scale(1.1);
  }
`;

const StyledConfirm = styled.span`
  position: absolute;
  top: -30px;
  background-color: #E1E1E1;
  border-radius: 5px;
  padding: 10px;
  color: #d92026;
  font-family: Montserrat, sans-serif;
  & h5 {
    margin: 0;
  }
  & div{
    display: flex;
    justify-content: space-evenly;
    & span {
      color: #231f20 !important;
      transition: .5s;
      &:hover {
        text-decoration: underline;
        text-decoration-color: #d92026;
        cursor: pointer;
        transform: scale(1.1);
      }
    }
  }
  ${(props) => props.isshown === "true" ? `
    display: block;
  `: `
  display: none;
  `}

`;

const GalleryItem = ({ context: { state, dispatch }, url, isEdit }) => {

  const [isShown, setIsShown] = useState(false);
  const showConfirm = () => {
    setIsShown(true);
  }

  const initRemoveLogo = async () => {
    setIsShown(false);
    const logoRes = await removeLogo({ url: url, id: getUserId() });
    let newLogoState = state.logos;
    newLogoState.splice(newLogoState.indexOf(logoRes.data.url), 1);
    dispatch(loadLogos([...newLogoState]));
  }
  return (
    <Grid item xs={12}>
      {isEdit && <StyledSpan onClick={() => showConfirm()}>-</StyledSpan>}
      <Grid container justifyContent="center" alignContent="center" item xs={12}>
        <img alt={""} className={url === "" ? "opacity0" : "opacity100"} src={`${url !== "" ? `https://logo.clearbit.com/${url}` : ""}`} />
      </Grid>
      <StyledConfirm isshown={String(isShown)}>
        <h5>Are you sure you want to delete this logo?</h5>
        <div>
          <span onClick={() => initRemoveLogo()}>yes</span>
          <span onClick={() => setIsShown(false)}>no</span>
        </div>
      </StyledConfirm>
    </Grid>
  )
}
export default withLocalContext(GalleryItem);
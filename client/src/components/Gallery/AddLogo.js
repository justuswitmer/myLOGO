import { Grid } from "@material-ui/core";
import { Fragment, useState } from "react";
import styled from "styled-components";
import { LogoContainer } from "../Common/LogoContainer";
import withLocalContext from "../store/withLocalContext"
import CloseIcon from '@mui/icons-material/Close';
import { addLogo } from "../../services";
import { loadLogos } from "../store/actions";
import { getUserId } from "../store/selectors";

const StyledDiv = styled.div`
  background-color: #89b089;
  width: 100%;
  position: unset;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  display: flex;
  >span {
    color: white;
    font-size: 70px;
    margin-bottom: 15px;
    transition: .5s;
  }
  &:hover {
    >span {
      transform: scale(1.3);
    }
  }
`;

const StyledChildDiv = styled.div`
  transition: .3s;
  background-color: #1010103b;
  backdrop-filter: blur(6px);
  z-index: 4001;
  position: absolute;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${(props) => props.showlogosearch === "true" ? `
  opacity: 1;
  width: 100vw;
  height: 100vh;
  >div{
    margin: auto;
    width: 50%;
    height: 400px;
    background-color: #89b089;
    border-radius: 5px;
    padding: 0 50px;
    @media (max-width: 600px) {
      width: 95%;
      padding: 0 10px;
    }
  }
  `: `
    opacity: 0;
    width: 50px;
    height: 50px;
  `}

  & span {
    color: black;
    font-size: 25px;
    font-weight: 500;
    margin-top: 20px;
    margin-bottom: -60px;
    margin-right: -20px;
    transition: .3s;
    &:hover {
      cursor: pointer;
      transform: scale(1.2);
    }
    @media (max-width: 600px) {
      margin-right: 0;
    }
  }
`;

const AddLogo = ({ context: { state, dispatch } }) => {
  const [showLogoSearch, setShowLogoSearch] = useState(false);
  const [initLogoUrl, setInitLogoUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [showNoImage, setShowNoImage] = useState(false);
  const [dupeFound, setDupeFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initAddLogo = () => {
    setShowLogoSearch(true);
  }

  const findLogo = async () => {
    try {
      setIsLoading(true);
      let imgRes = await fetch(`https://logo.clearbit.com/${initLogoUrl}`);
      setIsLoading(false);
      if (imgRes.status === 200) {
        setLogoUrl(imgRes.url);
        setShowImage(true);
        setShowNoImage(false);
        setDupeFound(false);
      }
    } catch (error) {
      setShowImage(false);
      setShowNoImage(true);
      setDupeFound(false);
    }
  }

  const sendLogoToDB = async () => {
    if (state.logos.includes(initLogoUrl)) {
      setShowNoImage(false);
      setShowImage(false);
      setDupeFound(true);
    } else {
      let imgRes = await addLogo({ url: initLogoUrl, id: getUserId() });
      let logoArr = state.logos;
      logoArr = [...logoArr, imgRes.data.url];
      setInitLogoUrl("");
      setLogoUrl("");
      setShowImage(false);
      setDupeFound(false);
      setShowLogoSearch(false);
      await dispatch(loadLogos([...logoArr]));
    }
  }

  return (
    <Fragment>
      <LogoContainer
        children={<StyledDiv onClick={() => initAddLogo()}>
          <span>+</span>
        </StyledDiv>}
      />

      <StyledChildDiv showlogosearch={String(showLogoSearch)}>
        <Grid container>
          <Grid item xs={12} container justifyContent="flex-end">
            <span onClick={() => setShowLogoSearch(false)}><CloseIcon /></span>
          </Grid>
          <Grid item xs={12}>
            <h2>Add a logo</h2>
            <p>Type in the domain of the company logo you wish to find</p>
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <input placeholder="e.g. target.com" value={initLogoUrl} onChange={(val) => setInitLogoUrl(val.target.value)} />
            <button
              className="link"
              onClick={() => findLogo()}
            >
              {isLoading ? "Searching" : "Find Logo"}
            </button>
          </Grid>
          {showNoImage &&
            <Grid item xs={12}>
              <p>No Logo found!</p>
            </Grid>
          }
          {dupeFound &&
            <Grid item xs={12}>
              <p>Hmm, it looks like you already have this logo in your gallery...</p>
            </Grid>
          }
          <Grid item xs={12}>
            {showImage &&
              <Fragment>
                <img alt="" src={logoUrl} />
                <p onClick={() => sendLogoToDB()} className="asLink">Add Logo ?</p>
              </Fragment>
            }
          </Grid>
        </Grid>
      </StyledChildDiv>
    </Fragment >
  )
}
export default withLocalContext(AddLogo);
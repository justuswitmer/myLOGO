import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { getIsAuthorized, getUserId } from "../store/selectors";
import withLocalContext from "../store/withLocalContext";
import GalleryItem from "./GalleryItem";
import { useCallback, useEffect, useState } from "react";
import { getLogos } from "../../services";
import { loadLogos } from "../store/actions";
import { Fragment } from "react";
import { LogoContainer } from "../Common/LogoContainer";


const GalleryView = ({ context: { state, dispatch } }) => {
  const [logosArr, setLogosArr] = useState([]);
  const [logosForNextCycle, setLogosForNextCycle] = useState([]);


  useEffect(() => {
    setIndexes();
    // eslint-disable-next-line
  }, [])


  const setIndexes = async () => {

    if (getIsAuthorized()) {

      let logoRes = await getLogos({ _id: getUserId() });

      dispatch(loadLogos(logoRes.data));

      let initArr = [];
      while (initArr.length < 12) {
        let randomIndex = Math.floor(Math.random() * 12)
        if (!initArr.includes(logoRes.data[randomIndex])) {
          initArr = [...initArr, logoRes.data[randomIndex]];
        }
      }
      setLogosArr([...initArr]);
    }
  }

  const advance = useCallback(() => {
    let tempPhase1Arr = [];
    let initArr = logosArr;
    let tempIndexes = [];

    // pick three random logos that are showing in the gallery
    while (tempPhase1Arr.length < 3) {
      let randomIndex = Math.floor(Math.random() * initArr.length)
      if (((!tempPhase1Arr.includes(initArr[randomIndex])) && initArr[randomIndex] !== "")) {
        // remove logo from arr and replace it with an empty string
        let modInitArr = initArr.splice(randomIndex, 1, "");
        // take the removed logo and add it to a tempArr to used for later 
        tempPhase1Arr = [...tempPhase1Arr, modInitArr[0]];
        // add the index number of the remove arr to be used for later
        tempIndexes = [...tempIndexes, randomIndex]
      }
    }
    // grab logos from state that were added from the previous cycle
    // note: when this is the first cycle this arr will be empty
    let tempLogosForNextCycle = logosForNextCycle;

    // start searching for a spot to add in the logos from the previous cycle
    while (tempLogosForNextCycle.length > 0) {
      let randomIndex = Math.floor(Math.random() * initArr.length)
      // if randomIndex is not the the tempIndexes arr and is also an empty string then use it
      if (((!tempIndexes.includes(randomIndex)) && initArr[randomIndex] === "")) {
        // generate a randomIndex to determine which logo is going to be added in from the previous cycle
        let tempRandomIndex = Math.floor(Math.random() * tempLogosForNextCycle.length)
        // add in the randomly selected logo from the previous cycle
        initArr.splice(randomIndex, 1, tempLogosForNextCycle[tempRandomIndex]);
        // remove logo tempLogosForNextCycle, when the arr is empty we stop looping
        tempLogosForNextCycle.splice(tempRandomIndex, 1);
      }
    }
    // set up the logos for the next cycle
    setLogosForNextCycle(tempPhase1Arr);
    // update array of logos
    setLogosArr([...initArr]);
  }, [logosArr, logosForNextCycle]);

  useEffect(() => {
    const interval = setInterval(advance, 2000);
    return () => clearInterval(interval);
  }, [advance]);

  return (getIsAuthorized() ?
    <Fragment>
      {logosArr.map((item, i) => (
        <LogoContainer
          key={i}
          children={<GalleryItem
            url={item}
            index={i}
          />}
        />
      ))}
    </Fragment>
    :
    <Navigate to={ROUTES.LOGIN_IN} />)
}
export default withLocalContext(GalleryView);
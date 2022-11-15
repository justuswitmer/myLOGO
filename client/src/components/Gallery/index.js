import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { getIsAuthorized, getUserId } from "../store/selectors";
import withLocalContext from "../store/withLocalContext";
import { Grid } from "@material-ui/core";
import GalleryItem from "./GalleryItem";
import { useEffect, useState } from "react";
import { getLogos } from "../../services";
import { loadLogos } from "../store/actions";

const Gallery = ({ context: { state, dispatch } }) => {
  const [indexesArr, setIndexesArr] = useState([]);
  const [logosForNextCycle, setLogosForNextCycle] = useState([]);

  useEffect(() => {
    setIndexes();
    // eslint-disable-next-line
  }, [])


  useEffect(() => {
    setInterval(() => {
      console.log('hi');
      advanceCycle();
    }, 1000);
  }, []);
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
      setIndexesArr([...initArr]);
    }
  }


  const advanceCycle = () => {

    let tempPhase1Arr = [];
    let initArr = indexesArr;

    // pick three random numbers that are in the gallery and not in phase2
    while (tempPhase1Arr.length < 3) {
      let randomIndex = Math.floor(Math.random() * initArr.length)
      if ((!tempPhase1Arr.includes(initArr[randomIndex]) && initArr[randomIndex] !== "")) {
        let modInitArr = initArr.splice(randomIndex, 1, "");
        tempPhase1Arr = [...tempPhase1Arr, { index: randomIndex, url: modInitArr[0] }];
      }
    }
    setIndexesArr([...initArr]);
    let tempLogosForNextCycle = logosForNextCycle;
    while (tempLogosForNextCycle.length > 0) {
      let randomIndex = Math.floor(Math.random() * initArr.length)
      if ((!tempPhase1Arr.includes(initArr[randomIndex]) && initArr[randomIndex] === "")) {
        let tempRandomIndex = Math.floor(Math.random() * tempLogosForNextCycle.length)
        initArr.splice(randomIndex, 1, tempLogosForNextCycle[tempRandomIndex].url);
        tempLogosForNextCycle.splice(tempRandomIndex, 1);
      }

    }
    setLogosForNextCycle(tempPhase1Arr);
    setIndexesArr([...initArr]);
  }

  return (getIsAuthorized() ? <Grid container>
    <Grid item xs={12}>
      <button onClick={() => advanceCycle()}>advance cycle</button>
    </Grid>
    {indexesArr.map((item, i) => (
      <Grid key={i} item xs={12} md={3} style={{ border: "1px solid purple" }}>
        <GalleryItem
          url={item}
          index={i}
        />
      </Grid>
    ))}
  </Grid>
    :
    <Navigate to={ROUTES.LOGIN_IN} />)
}
export default withLocalContext(Gallery);
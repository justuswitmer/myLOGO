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
  const [fadeOutIndexes, setFadeOutIndexes] = useState([]);
  const [fadeInIndexes, setFadeInIndexes] = useState([]);

  useEffect(() => {
    setIndexes();

    // eslint-disable-next-line
  }, [])

  const setIndexes = async () => {
    if (getIsAuthorized()) {

      let logoRes = await getLogos({ _id: getUserId() });

      await dispatch(loadLogos(logoRes.data));

      let initArr = [];
      while (initArr.length < 16) {
        let randomIndex = Math.floor(Math.random() * 16)
        if (!initArr.includes(logoRes.data[randomIndex])) {
          initArr.push(logoRes.data[randomIndex])
        }
      }
      setIndexesArr(initArr);
    }
  }

  const advanceCycle = () => {
    // setIndexes();
    console.log('hello');

    let phase1Arr = [];
    let initArr = indexesArr;
    let numberSave = [];
    // let phase2Arr = [];

    // pick three random numbers that are in the gallery and not in phase2
    while (phase1Arr.length < 3) {
      let randomIndex = Math.floor(Math.random() * initArr.length)
      if ((!phase1Arr.includes(initArr[randomIndex]))) {
        let modInitArr = initArr.splice(randomIndex, 1, "");
        //     numberSave.push(randomIndex);
        phase1Arr = [...phase1Arr, modInitArr[0]];
      }
    }
    console.log('initArr', initArr);
    setIndexesArr([...initArr]);
    // setFadeOutIndexes(phase1Arr);

    let count = 0;
    // while (fadeInIndexes.length > count) {
    //   let randomIndex = Math.floor(Math.random() * indexesArr.length)
    //   if (!indecesToFadeOut.includes(randomIndex)) {
    //     indecesToFadeIn.push(randomIndex);
    //   }
    //   count++;
    // }
    // console.log(indecesToFadeOut);
    // console.log(indecesToFadeIn);
  }

  return (getIsAuthorized() ? <Grid container>
    <Grid item xs={12}>
      <button onClick={() => advanceCycle()}>advance cycle</button>
      {JSON.stringify(indexesArr)}
    </Grid>
    {[...Array(16).keys()].map((item) => (
      <Grid key={item} item xs={12} md={3}>
        <GalleryItem
          url={indexesArr[item]}
        />
      </Grid>
    ))}
  </Grid>
    :
    <Navigate to={ROUTES.LOGIN_IN} />)
}
export default withLocalContext(Gallery);
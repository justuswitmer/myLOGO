import withLocalContext from "../store/withLocalContext";
import { useEffect } from "react";
import { getIsAuthorized, getUserId } from "../store/selectors";
import { loadLogos } from "../store/actions";
import { getLogos } from "../../services";

export const GlobalLoad = ({ context: { state, dispatch } }) => {

  useEffect(() => {
    setGlobalState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setGlobalState = async () => {
    try {
      if (getIsAuthorized()) {

        let logoRes = await getLogos({ _id: getUserId() });
        dispatch(loadLogos(logoRes.data));
      }

    } catch (err) {
      console.log(err)
    }
  };

  return null;

}

export default withLocalContext(GlobalLoad);
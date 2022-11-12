import { Navigate } from "react-router-dom";
import { LOGOS } from "../../constants/logos";
import { ROUTES } from "../../constants/routes";
import { getIsAuthorized } from "../store/selectors";
import withLocalContext from "../store/withLocalContext";

const Dashboard = ({ context: { state } }) => {

  return (getIsAuthorized() ? <div>
    Dashboard
    {state.logos.map(logo => (
      <img key={logo} alt={logo} src={`https://logo.clearbit.com/${logo}`} />
    ))}
  </div>
    :
    <Navigate to={ROUTES.LOGIN_IN} />)
}
export default withLocalContext(Dashboard);
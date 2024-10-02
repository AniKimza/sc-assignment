import { useLocation, useParams, useHistory } from "react-router-dom";
export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let params = useParams();
    let history = useHistory();
    return <Component {...props} location={location} params={params} history={history} />;
  }
  return ComponentWithRouterProp;
}

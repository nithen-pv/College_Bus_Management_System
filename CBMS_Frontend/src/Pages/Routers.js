import { Button } from "@material-ui/core";
import { Route, Switch, Link } from "react-router-dom";
import Dashboard from "./Admin/Dashboard";
import StudentList from "./Admin/StudentList";
import BusList from "./Admin/BusList";
import BusLocationList from "../Components/Bus/BusLocationList";
import Programs from "./Admin/Programs";
import Staff from "./Admin/Staff";
import Profile from "./Student/Profile";
import BusTrack from "./Bus/BusTrack";
import BusLocation from "./Student/BusLocation";
import BusDashboard from "./Bus/BusDashboard";

function Routers() {
  return (
    <div>
      <Switch>
        <Route path="/app/bustrack" exact component={BusLocationList} />
        <Route path="/app/dashboard" component={Dashboard} />
        <Route path="/app/student" component={StudentList} />
        <Route path="/app/bus" component={BusList} />
        <Route path="/app/programs" component={Programs} />
        <Route path="/app/staff" component={Staff} />
        <Route path="/app/profile" component={Profile} />
        <Route path="/account" component={Dashboard} />
        <Route path="/app/buslocation" component={BusTrack} />
        <Route path="/app/busDashboard" component={BusDashboard} />
        <Route path="/app/busDrawer">
          <Link to="/app/buslocation">
            <div style={{ textAlign: "center" }}>
              <Button color="primary" variant="contained">
                Allow Location Access
              </Button>
            </div>
          </Link>
        </Route>
        <Route path="/app/trackbus" component={BusLocation} />
      </Switch>
    </div>
  );
}

export default Routers;

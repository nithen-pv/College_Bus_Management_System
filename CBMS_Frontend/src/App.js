// import "./App.css";
import { Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import Dashboard from "./Pages/Dashboard";
import SignIn from "./Pages/SignIn";
import Account from "./Pages/Account";
import NotFound from "./Pages/NotFound";

function App() {
  const authContext = useContext(AuthContext);
  return (
    <>
      <Switch>
        {authContext.isAuthenticated ? (
          <>
            <Route path="/app/*" exact>
              <Dashboard />
            </Route>
            <Route path="/account" component={Account} />
          </>
        ) : (
          <>
            <Route path="/" exact>
              <SignIn />
            </Route>
            <Route path="/:error" exact>
              <NotFound/>
            </Route>
            <Route path="/:error/:error" exact>
              <NotFound/>
            </Route>
          </>
        )}
      </Switch>
    </>
  );
}

export default App;

// http://api.positionstack.com/v1/forward? access_key = d3d7be0887e8f12d0cea06b711bdcea7& query = 40.7638435,-73.9729691

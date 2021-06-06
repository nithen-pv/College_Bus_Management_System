import { Link } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core/";
import { DirectionsBus, AccountCircle, Dashboard } from "@material-ui/icons";
let linkStyle = {
  textDecoration: "none",
};

function BusDrawer() {
  return (
    <div>
      <List>
        <Link to="/app/busDashboard" style={linkStyle}>
          <ListItem button>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
        </Link>

        <Link to="/app/busDrawer" style={linkStyle}>
          <ListItem button>
            <ListItemIcon>
              <DirectionsBus />
            </ListItemIcon>
            <ListItemText primary={"Bus"} />
          </ListItem>
        </Link>

        <Link to="/account" style={linkStyle}>
          <ListItem button>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary={"Account"} />
          </ListItem>
        </Link>
      </List>
    </div>
  );
}

export default BusDrawer;

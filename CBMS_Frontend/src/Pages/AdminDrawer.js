import { useContext } from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core/";
import {
  Dashboard as DashboardIcon,
  Group,
  DirectionsBus,
  LocationOn,
  AccountCircle,
  AccountTree,
} from "@material-ui/icons";
import { AuthContext } from "../Context/AuthContext";

let linkStyle = {
  textDecoration: "none",
};

function AdminDrawer() {
  const authContext = useContext(AuthContext);
  return (
    <List>
      <Link to="/app/dashboard" style={linkStyle}>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>
      </Link>

      <Link to="/app/student" style={linkStyle}>
        <ListItem button>
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          <ListItemText primary={"Students"} />
        </ListItem>
      </Link>

      <Link to="/app/bus" style={linkStyle}>
        <ListItem button>
          <ListItemIcon>
            <DirectionsBus />
          </ListItemIcon>
          <ListItemText primary={"Bus"} />
        </ListItem>
      </Link>

      <Link to="/app/bustrack" style={linkStyle}>
        <ListItem button>
          <ListItemIcon>
            <LocationOn />
          </ListItemIcon>
          <ListItemText primary={"Bus Track"} />
        </ListItem>
      </Link>

      <Link to="/app/programs" style={linkStyle}>
        <ListItem button>
          <ListItemIcon>
            <AccountTree />
          </ListItemIcon>
          <ListItemText primary={"Programs"} />
        </ListItem>
      </Link>
      
      {authContext.user.userType === "admin" && (
        <Link to="/app/staff" style={linkStyle}>
          <ListItem button>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary={"Staff"} />
          </ListItem>
        </Link>
      )}

      <Link to="/account" style={linkStyle}>
        <ListItem button>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary={"Account"} />
        </ListItem>
      </Link>
    </List>
  );
}

export default AdminDrawer;

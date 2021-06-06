import { Link } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core/";
import {
  Dashboard as DashboardIcon,
  DirectionsBus,
  AccountCircle,
} from "@material-ui/icons";
let linkStyle = {
  textDecoration: "none",
};
function StudentDrawer() {
  return (
    <List>
      <Link to="/app/profile" style={linkStyle}>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>
      </Link>

      <Link to="/app/trackbus" style={linkStyle}>
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
  );
}

export default StudentDrawer;

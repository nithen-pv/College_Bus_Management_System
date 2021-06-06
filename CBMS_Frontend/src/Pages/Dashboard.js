import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  Divider,
} from "@material-ui/core/";
import { Menu as MenuIcon, AccountCircle, ExitToApp } from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useContext } from "react";

// Admin Components
import { AuthContext } from "../Context/AuthContext";
import Routers from "./Routers";
import AdminDrawer from "./AdminDrawer";
import StudentDrawer from "./StudentDrawer";
import BusDrawer from "./BusDrawer";
import AuthService from "../Services/AuthService";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  userIcon: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  sidebarUser: {
    textAlign: "center",
    padding: 0,
  },
}));

function Dashboard(props) {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <div className={classes.sidebarUser}>
        <AccountCircle className={classes.userIcon} />
      </div>

      <h3 className={classes.sidebarUser}>{authContext.user.username}</h3>

      <Divider />
      {(authContext.user.userType === "admin" ||
        authContext.user.userType === "staff") && <AdminDrawer />}
      {authContext.user.userType === "student" && <StudentDrawer />}
      {authContext.user.userType === "busDriver" && <BusDrawer />}
    </div>
  );

  const LogOutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        authContext.setUser(data.user);
        authContext.setIsAuthenticated(false);
        history.push("/");
      }
    });
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            CBMS
          </Typography>
        </Toolbar>

        <div
          style={{
            textAlign: "right",
            position: "absolute",
            right: "20px",
            margin: "2px",
          }}
        >
          <IconButton>
            <ExitToApp
              onClick={LogOutHandler}
              style={{ color: "white", fontSize: "30px" }}
            />
          </IconButton>
        </div>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routers />
      </main>
    </div>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;

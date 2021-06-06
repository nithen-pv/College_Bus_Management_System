import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { Button, InputAdornment } from "@material-ui/core/";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Person, Lock } from "@material-ui/icons/";
import { AuthContext } from "../Context/AuthContext";
import AuthService from "../Services/AuthService";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

let formDesign = {
  background: "white",
  padding: "20px",
  borderRadius: "20px",
  boxShadow: "5px 10px 8px 10px #888888",
};

export default function SignIn(props) {
  const { setUser, setIsAuthenticated } = useContext(AuthContext);
  const history = useHistory();
  const classes = useStyles();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [loginCred, setloginCred] = useState(false);

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const Autherisation = async (e) => {
    e.preventDefault();
    const { username, password } = userData;
    const userInfo = {
      username: username,
      password: password,
    };
    await AuthService.login(userInfo).then((data) => {
      console.log("DATA", data);
      const { isAuthenticated, user } = data;
      if (isAuthenticated) {
        if (user.userType === "admin" || user.userType === "staff")
          history.push("/app/dashboard");
        else if (user.userType === "student") history.push("/app/profile");
        else if (user.userType === "busDriver") history.push("/app/busDashboard");
        setUser(user);
        setIsAuthenticated(isAuthenticated);
      } else {
        setloginCred(true);
        console.log("User Not Authorized");
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper} style={formDesign}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={Autherisation}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person fontSize="small" />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock fontSize="small" />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleChange}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          {loginCred && (
            <p style={{ color: "red", textAlign: "center", margin: "0" }}>
              Incorrect username or password
            </p>
          )}

          {userData.username !== "" && userData.password !== "" ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              className={classes.submit}
              disabled
            >
              Sign In
            </Button>
          )}
        </form>
      </div>
    </Container>
  );
}

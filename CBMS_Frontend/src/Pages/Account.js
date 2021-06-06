import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Button, InputAdornment } from "@material-ui/core/";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Lock } from "@material-ui/icons/";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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

export default function SignIn() {
  const classes = useStyles();

  const [userData, setUserData] = useState({
    password: "",
    newPassword: "",
  });

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const Autherisation = async (e) => {
    e.preventDefault();
    const { password, newPassword } = userData;
    const userInfo = {
      password: password,
      newPassword: newPassword,
    };
    console.log(userInfo);
    setUserData({
      password: "",
      newPassword: "",
    });
    // try {
    //   await axios.post("/auth/signin", userInfo).then((response) => {
    //     const req = response;
    //     console.log(req.data.sucess);
    //     navigate("/app", { replace: true });
    //   });
    // } catch (error) {
    //   navigate("/login", { replace: true });
    //   console.log("Not Auth User",error);
    // }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper} style={formDesign}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Manage Account
        </Typography>
        <form className={classes.form} noValidate onSubmit={Autherisation}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock fontSize="small"/>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="New Password"
            name="password"
            autoComplete="username"
            onChange={handleChange}
            value={userData.password}
            type="password"
          />
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock fontSize="small"/>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="Confirm New Password"
            type="password"
            id="newPassword"
            onChange={handleChange}
            value={userData.newPassword}
          />
          {userData.newPassword !== "" ? (
            userData.password !== userData.newPassword ? (
              <p style={{ color: "red", textAlign: "center" }}>
                New password and Confirm Password does not match
              </p>
            ) : (
              <p style={{ color: "green", textAlign: "center" }}>
                Passwords matches
              </p>
            )
          ) : (
            <p></p>
          )}
          {userData.password && userData.newPassword !== "" ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Change Password
            </Button>
          ) : (
            <Button
              disabled
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Change Password
            </Button>
          )}
        </form>
      </div>
    </Container>
  );
}

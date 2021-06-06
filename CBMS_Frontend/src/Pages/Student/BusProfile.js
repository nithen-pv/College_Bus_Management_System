import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  withStyles,
  makeStyles,
  InputAdornment,
} from "@material-ui/core";
import { Person, Navigation, Phone, DirectionsBus } from "@material-ui/icons/";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const ValidationTextField = withStyles({
  root: {
    "& input:valid + fieldset": {
      borderColor: "#3f51b5",
      borderWidth: 2,
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
    "& input:valid:hover + fieldset": {
      borderColor: "#3f51b5",
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
  },
})(TextField);

const BusProfile = (props) => {
  const classes = useStyles();
  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="Bus Information" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <ValidationTextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DirectionsBus />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                className={classes.margin}
                label="Bus Number"
                variant="outlined"
                value={props.busData.busNo + ""}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <ValidationTextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Navigation />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                className={classes.margin}
                label="Bus Route"
                variant="outlined"
                value={props.busData.busRoute + ""}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <ValidationTextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                className={classes.margin}
                label="Bus Driver"
                variant="outlined"
                value={props.busData.busDriver + ""}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <ValidationTextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                className={classes.margin}
                label="Driver Phone No"
                variant="outlined"
                value={props.busData.drverPhNo + ""}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <ValidationTextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                className={classes.margin}
                label="Bus Staff"
                variant="outlined"
                value={props.busData.busStaff + ""}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <ValidationTextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                className={classes.margin}
                label="Staff Phone No"
                variant="outlined"
                value={props.busData.staffPhNo + ""}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

export default BusProfile;

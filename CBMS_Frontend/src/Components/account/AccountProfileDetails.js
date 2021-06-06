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
import {
  Person,
  AccountTree,
  DirectionsBus,
  LocationOn,
  DonutLarge,
  Notes,
  Payment,
} from "@material-ui/icons/";

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

const AccountProfileDetails = (props) => {
  const classes = useStyles();
  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="Student Information" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
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
                label="Name"
                variant="outlined"
                value={props.studentData.name + ""}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <ValidationTextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Notes />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                className={classes.margin}
                label="Roll Number"
                variant="outlined"
                value={props.studentData.rollNo + ""}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <ValidationTextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountTree />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                className={classes.margin}
                label="Batch"
                variant="outlined"
                value={
                  props.studentData.batch +
                  " " +
                  props.studentData.program +
                  " " +
                  props.studentData.year
                }
              />
            </Grid>

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
                label="Bus"
                variant="outlined"
                value={props.studentData.bus + ""}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <ValidationTextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                className={classes.margin}
                label="Bus Stop"
                variant="outlined"
                value={props.studentData.busStop + ""}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <ValidationTextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Payment />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                className={classes.margin}
                label="Bus Fee"
                variant="outlined"
                value={props.studentData.busFee + ""}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <ValidationTextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DonutLarge />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                className={classes.margin}
                label="Payment Status"
                variant="outlined"
                value={props.studentData.paymentStatus + ""}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;

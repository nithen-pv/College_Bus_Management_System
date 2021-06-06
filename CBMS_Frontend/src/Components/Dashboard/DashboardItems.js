import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    height: 125,
  },
}));

const DashboardItems = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={5} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {props.itemName}
            </Typography>
            <Typography color="textPrimary" variant="h5">
              {props.val}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={props.iconStyle}>{props.icon}</Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default DashboardItems;

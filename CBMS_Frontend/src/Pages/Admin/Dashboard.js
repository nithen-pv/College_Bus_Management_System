import { useEffect, useState, useContext } from "react";
import { Box, Container, Grid, CircularProgress } from "@material-ui/core";
import DashboardItems from "../../Components/Dashboard/DashboardItems";
import { Group, DirectionsBus, AccountTree } from "@material-ui/icons/";
import { makeStyles } from "@material-ui/core/styles";
import Services from "../../Components/Services";
import { AuthContext } from "../../Context/AuthContext";

const useStyles = makeStyles((theme) => ({
  card: {
    height: 125,
  },
  students: {
    marginLeft: theme.spacing(10),
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: "#f44336",
  },
  bus: {
    marginLeft: theme.spacing(10),
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: "#00acc1",
  },
  program: {
    marginLeft: theme.spacing(10),
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: "#4caf50",
  },
  staff: {
    marginLeft: theme.spacing(10),
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: "#ff9800",
  },
}));

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const [countData, setCountData] = useState({
    student: "",
    bus: "",
    staff: "",
    program: "",
  });
  useEffect(() => {
    async function fetchData() {
      const req = await Services.getCount();
      setCountData({
        student: req.data[0].data.data,
        program: req.data[1].data.data,
        bus: req.data[2].data.data,
        staff: req.data[3].data.data,
      });
    }
    fetchData();
  }, []);
  const classes = useStyles();
  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        {countData.student !== "" ? (
          <Container maxWidth={false}>
            <Grid container spacing={3}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <DashboardItems
                  icon={<Group />}
                  iconStyle={classes.students}
                  itemName={"Students"}
                  val={countData.student}
                />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <DashboardItems
                  icon={<DirectionsBus />}
                  iconStyle={classes.bus}
                  itemName={"Buses"}
                  val={countData.bus}
                />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <DashboardItems
                  icon={<AccountTree />}
                  iconStyle={classes.program}
                  itemName={"Programs"}
                  val={countData.program}
                />
              </Grid>
              {authContext.user.userType === "admin" && (
                <Grid item lg={3} sm={6} xl={3} xs={12}>
                  <DashboardItems
                    icon={<Group />}
                    iconStyle={classes.staff}
                    itemName={"Staffs"}
                    val={countData.staff}
                  />
                </Grid>
              )}
            </Grid>
          </Container>
        ) : (
          <CircularProgress style={{ margin: "10px" }} disableShrink />
        )}
      </Box>
    </>
  );
};

export default Dashboard;

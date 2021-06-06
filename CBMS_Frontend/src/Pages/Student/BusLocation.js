import { useState, useEffect, useContext } from "react";
import { LocationOn, LocationOff } from "@material-ui/icons";
import {
  Grid,
  Container,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  CircularProgress,
} from "@material-ui/core/";
import { AuthContext } from "../../Context/AuthContext";
import axios from "../../Components/axios";
import BusProfile from "./BusProfile";

function BusLocation() {
  const authcontext = useContext(AuthContext);
  const [busData, setBusData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let request;
      const req = await axios.get("/student/user/" + authcontext.user.username);
      req.data.data &&
        (request = await axios.get("/bus/busdetails/" + req.data.data[0].bus));
      request.data.data && setBusData(request.data.data[0]);
      console.log(request.data.data[0]);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {busData === undefined || busData.length === 0 ? (
        <div style={{ height: "25vh" }}>
          <CircularProgress style={{ margin: "10px" }} disableShrink />
        </div>
      ) : (
        <div>
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} xs={12}>
                <Card>
                  <CardContent>
                    <Box
                      style={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h5"
                        style={{ textAlign: "center" }}
                      >
                        Current Bus Location
                      </Typography>
                      {busData.busLocation !== "Not Available" ? (
                        <LocationOn
                          style={{
                            height: 100,
                            width: 100,
                            color: "green",
                          }}
                        />
                      ) : (
                        <LocationOff
                          style={{
                            height: 100,
                            width: 100,
                            color: "red",
                          }}
                        />
                      )}
                      <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h6"
                        style={{ textAlign: "center" }}
                      >
                        {busData.busLocation}
                      </Typography>
                      {/* <Typography color="textSecondary" variant="body1">
                      {busData.busRoute}
                    </Typography> */}
                    </Box>
                  </CardContent>
                  <Divider />
                </Card>
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                <BusProfile busData={busData} />
              </Grid>
            </Grid>
          </Container>
        </div>
      )}
    </>
  );
}

export default BusLocation;

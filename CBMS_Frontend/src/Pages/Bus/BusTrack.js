import { useContext } from "react";
import { ExploreOff, Explore } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import useGeoLocation from "./useGeoLocation";
import Services from "../../Components/Services";
import { AuthContext } from "../../Context/AuthContext";
import axios from "../../Components/axios";

const useStyles = makeStyles((theme) => ({
  dashboardContent: {
    background: "white",
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "5px 10px 8px 10px #888888",
  },
  locationIcon: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

function BusTrack() {
  const authContext = useContext(AuthContext);
  const [locationAddress, setlocationAddress] = useState("");
  const [bus, setBus] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      const req = await Services.getBusByUser(authContext.user.username);
      req.data.data && setBus(req.data.data);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const location = useGeoLocation();

  try {
    if (location.coordinates.lat) {
      let apikey = process.env.REACT_APP_OPENCAGE_API_KEY;
      let latitude = location.coordinates.lat;
      let longitude = location.coordinates.lng;

      let api_url = "https://api.opencagedata.com/geocode/v1/json";

      let request_url =
        api_url +
        "?" +
        "key=" +
        apikey +
        "&q=" +
        encodeURIComponent(latitude + "," + longitude) +
        "&pretty=1" +
        "&no_annotations=1";

      // see full list of required and optional parameters:
      // https://opencagedata.com/api#forward

      let request = new XMLHttpRequest();
      request.open("GET", request_url, true);

      request.onload = async function () {
        // see full list of possible response codes:
        // https://opencagedata.com/api#codes

        if (request.status === 200) {
          // Success!
          let data = JSON.parse(request.responseText);
          setlocationAddress(data.results[0].formatted);
          try {
            const res = await axios.patch("/bus/" + bus[0]._id, {
              busLocation: locationAddress,
            });
            console.log("Success", res);
          } catch (error) {
            console.log(error);
          }
        } else if (request.status <= 500) {
          // We reached our target server, but it returned an error

          console.log("unable to geocode! Response code: " + request.status);
          let resposeData = JSON.parse(request.responseText);
          console.log("error msg: " + resposeData.status.message);
        } else {
          console.log("server error");
        }
      };

      request.onerror = function () {
        // There was a connection error of some sort
        console.log("unable to connect to server");
      };

      request.send(); // make the request
    } else {
      console.log("Waiting for location access");
    }
  } catch (error) {
    const updateBusLocation = async () => {
      try {
        const res = await axios.patch("/bus/" + bus[0]._id, {
          busLocation: "Not Available",
        });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    updateBusLocation();
    console.log("Blocked Location Access");
  }
  return (
    <div className={classes.dashboardContent}>
      {locationAddress !== "" && (
        <p>
          <Button
            variant="outlined"
            color="secondary"
            style={{ marginBottom: "20px" }}
            href="http://localhost:3000/app/buslocation"
          >
            Block Location Access
          </Button>
          <br />
          <Explore
            className={classes.locationIcon}
            style={{ color: "green" }}
          />
          <br />
          Location Access Granted
        </p>
      )}
      <br />
      {location.loaded ? locationAddress : "Location data not available yet."}
      {!locationAddress && (
        <p>
          <ExploreOff
            className={classes.locationIcon}
            style={{ color: "red" }}
          />
          <br />
          Blocked Location Access
        </p>
      )}
    </div>
  );
}

export default BusTrack;

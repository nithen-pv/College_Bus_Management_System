import { useState, useEffect, useContext } from "react";
import { Box, Container, Grid ,CircularProgress} from "@material-ui/core";
import { AuthContext } from "../../Context/AuthContext";
import axios from "../../Components/axios";
import AccountProfile from "../../Components/account/AccountProfile";
import AccountProfileDetails from "../../Components/account/AccountProfileDetails";

const Account = () => {
  const authcontext = useContext(AuthContext);
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get("/student/user/" + authcontext.user.username);
      req.data.data && setStudentData(req.data.data[0]);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {studentData === undefined || studentData.length === 0 ? (
        <div style={{ height: "25vh" }}>
          <CircularProgress style={{ margin: "10px" }} disableShrink />
        </div>
      ) : (
        <Box
          sx={{
            backgroundColor: "background.default",
            minHeight: "100%",
            py: 3,
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} xs={12}>
                <AccountProfile studentData={studentData} />
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                <AccountProfileDetails studentData={studentData} />
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Account;

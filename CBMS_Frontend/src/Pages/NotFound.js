import { Box, Container, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const NotFound = () => (
  <>
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <Container maxWidth="md">
        <Typography align="center" color="textPrimary" variant="h4">
          404: The page you are looking for isn’t here
        </Typography>
        <br />
        <Typography align="center" color="textPrimary" variant="subtitle2">
          You either tried some shady route or you came here by mistake.
          Whichever it is, try using the navigation
        </Typography>
        <Box style={{ textAlign: "center" }}>
          <img
            alt="Under development"
            src="/static/images/undraw_page_not_found_su7k.svg"
            style={{
              marginTop: 50,
              maxWidth: "100%",
              width: 560,
            }}
          />
          <br />
          <br />
          <Link to="/">
            <Button variant="contained" color="primary">
              Back to Sign In page
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  </>
);

export default NotFound;

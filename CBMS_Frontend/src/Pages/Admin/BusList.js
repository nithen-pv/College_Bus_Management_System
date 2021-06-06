import { Box, Container } from "@material-ui/core";
import ListResults from "../../Components/Bus/BusListResults";

const BusList = () => (
  <>
    <Box
      style={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 3,
      }}
    >
      <Container maxWidth={false}>
        <Box style={{ pt: 3 }}>
          <ListResults />
        </Box>
      </Container>
    </Box>
  </>
);

export default BusList;

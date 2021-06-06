import { Box, Container } from '@material-ui/core';
import ListResults from '../../Components/Staff/StaffListResult';

const BusList = () => (
  <>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <ListResults/>
        </Box>
      </Container>
    </Box>
  </>
);

export default BusList;

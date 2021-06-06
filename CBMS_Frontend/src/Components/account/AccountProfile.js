import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

const AccountProfile = (props) => (
  <Card {...props}>
    <CardContent>
      <Box
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
          src={<AccountCircle />}
          style={{
            height: 100,
            width: 100,
          }}
        />
        <Typography color="textPrimary" gutterBottom variant="h4">
          {props.studentData.name}
        </Typography>
        <Typography color="textSecondary" variant="body1">
          {props.studentData.rollNo}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button color="primary" fullWidth variant="text">
        Upload picture
      </Button>
    </CardActions>
  </Card>
);

export default AccountProfile;

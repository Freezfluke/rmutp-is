import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import moment from "moment";

import { useSelector } from "react-redux";

const DashboardNav = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  const card = (
    <CardHeader
      style={{ height: 90 }}
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          {user.name[3]}
        </Avatar>
      }
      title={user.name}
      subheader={`เข้าร่วมเมื่อ ${moment(user.createdAt).fromNow()}`}
    />
  );

  return (
    <>
      <Box
        sx={{
          minWidth: 300,
        }}
      >
        <Card variant="outlined">{card}</Card>
      </Box>
      {auth &&
        auth.user &&
        auth.user.stripe_admin &&
        auth.user.stripe_admin.charges_enabled && (
          <>
            <Box
              sx={{
                minWidth: 300,
              }}
            >
              <Card variant="outlined">{card}</Card>
            </Box>
            <Box
              sx={{
                minWidth: 300,
              }}
            >
              <Card variant="outlined">{card}</Card>
            </Box>
          </>
        )}
    </>
  );
};

export default DashboardNav;

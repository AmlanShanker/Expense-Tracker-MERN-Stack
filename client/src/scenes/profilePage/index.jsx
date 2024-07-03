import { Box, useMediaQuery, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navBar";
import UserWidget from "scenes/widgets/UserWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Typography
        textAlign="center"
        fontWeight="bold"
        fontSize="32px"
        color="primary"
        mt="10px"
      >
        Profile Info
      </Typography>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "70%" : undefined}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": {
                gridColumn: isNonMobileScreens ? undefined : "span 4",
              },
            }}
          >
            <TextField
              label="First Name"
              value={user.firstName}
              InputProps={{
                readOnly: true,
              }}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Last Name"
              value={user.lastName}
              InputProps={{
                readOnly: true,
              }}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Email"
              value={user.email}
              InputProps={{
                readOnly: true,
              }}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              value={user.password}
              InputProps={{
                readOnly: true,
              }}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Location"
              value={user.location}
              InputProps={{
                readOnly: true,
              }}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Occupation"
              value={user.occupation}
              InputProps={{
                readOnly: true,
              }}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;

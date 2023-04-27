import React from "react";
import { useRecoilValue } from "recoil";
import { Avatar, Box, Text } from "zmp-ui";
import { userState } from "../../state";

const Welcome: React.FC = () => {
  const user = useRecoilValue(userState);
  return (
    <Box className="p-4 rounded-md">
      <Avatar className="shadow align-middle mb-2" src={user.avatar}>
        Hi
      </Avatar>
      <Text size="large" style={{ color: "white" }}>
        {user.name ? <>Kính chào công dân, {user.name}!</> : "..."}
      </Text>
    </Box>
  );
};

export default Welcome;

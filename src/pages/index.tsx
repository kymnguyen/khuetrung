import React, { Suspense } from "react";
import { Page, Box, Avatar, Text } from "zmp-ui";

import Welcome from "../components/home/welcome";
import Menu from "../components/home/menu";

const HomePage = () => {
  return (
    <Page className="flex">
      <Box mx={4} mb={4} mt={5} flex flexDirection="column" className="flex-1">
        <Suspense>
          <Welcome />
          <Menu />
        </Suspense>
      </Box>
    </Page>
  );
};

export default HomePage;

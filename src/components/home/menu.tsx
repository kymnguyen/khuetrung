import React from "react";
import { useRecoilValue } from "recoil";
import { Box, Text } from "zmp-ui";

import { MenuItem } from ".";
import { menuHomeState } from "../../state";

const Menu: React.FC = () => {
  const menuHome = useRecoilValue(menuHomeState);
  return (
    <Box className="rounded-md mt-4 grid grid-cols-3 grid-row-3 gap-4 pb-10">
      {menuHome.map((item, index) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </Box>
  );
};

export default Menu;

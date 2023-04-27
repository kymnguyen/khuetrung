import React from "react";
import { openWebview } from "zmp-sdk";
import { Box, Text } from "zmp-ui";
import { MenuHome } from "../../models";

interface MenuItemProps {
  item: MenuHome;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  return (
    <button
      onClick={() => {
        openWebview({
          url: item.url,
          success: () => {},
          fail: (error) => {},
        });
      }}
      key={item.id}
      className="flex border-0 flex-col bg-rose-100 rounded-md row-span-3 h-auto items-center pb-1 p-0"
    >
      <Box className="w-full rounded-md">
        <div className="relative aspect-video w-full">
          <img
            src={item.icon}
            className="relative w-full h-full object-cover rounded-xl"
          />
        </div>
      </Box>
      <Text size="xxxSmall" className="text-center px-1 mt-1">
        {item.name}
      </Text>
    </button>
  );
};

export default MenuItem;

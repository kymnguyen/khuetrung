import React from "react"
import { Box, Text } from "zmp-ui"
import { MenuHome } from "../../models"

interface MenuItemProps {
  item: MenuHome
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  return (
    <Box className="flex flex-col bg-rose-100 rounded-md row-span-3 h-auto items-center pb-1">
      <Box className="w-full h-20 bg-slate-200 rounded-md" />
      <Text size="xxxSmall" className="text-center px-1 mt-1">{item.name}</Text>
    </Box>
  )
}

export default MenuItem
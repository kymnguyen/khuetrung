import React, { Suspense } from "react";
import { Page, Box, Avatar, Text } from "zmp-ui";
import { getConfig } from "../components/config-provider";
import Inquiry, { QuickFilter } from "../components/inquiry";
import RestaurantItem from "../components/restaurant";
import {
  useRecoilValue,
  useRecoilValue_TRANSITION_SUPPORT_UNSTABLE,
} from "recoil";
import {
  nearestRestaurantsState,
  popularRestaurantsState,
  userState,
} from "../state";
import Welcome from "../components/home/welcome";
import Menu from "../components/home/menu";

const { Title, Header } = Text;

function Popular() {
  const populars = useRecoilValue(popularRestaurantsState);

  return (
    <>
      <Box mx={4} mt={6}>
        <Header className="mt-6 mb-3 font-semibold">Địa điểm phổ biến</Header>
      </Box>
      {populars.length ? (
        <div className="overflow-auto snap-x snap-mandatory scroll-p-4 no-scrollbar">
          <Box m={0} pr={4} flex className="w-max">
            {populars.map((restaurant) => (
              <Box
                key={restaurant.id}
                ml={4}
                mr={0}
                className="snap-start"
                style={{ width: "calc(100vw - 120px)" }}
              >
                <RestaurantItem layout="cover" restaurant={restaurant} />
              </Box>
            ))}
          </Box>
        </div>
      ) : (
        <Box mx={4}>Không có địa điểm nào ở khu vực này</Box>
      )}
    </>
  );
}

function Nearest() {
  const nearests = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(
    nearestRestaurantsState
  );
  return (
    <>
      <Box mx={4} mt={5}>
        <Header className="mt-6 mb-3 font-semibold">Gần bạn nhất</Header>
        {nearests.map((restaurant) => (
          <Box key={restaurant.id} mx={0} my={3}>
            <RestaurantItem
              layout="list-item"
              restaurant={restaurant}
              after={
                <Text size="small" className="text-gray-500">
                  {restaurant.address}
                </Text>
              }
            />
          </Box>
        ))}
      </Box>
    </>
  );
}

const HomePage = () => {
  return (
    <Page className="flex" >
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

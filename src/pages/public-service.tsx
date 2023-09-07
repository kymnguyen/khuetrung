import { Box, Page } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { openWebview } from "zmp-sdk";

import RestaurantDetail from "./restaurant/detail";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { PublicServiceState } from "../state";
import { VNeID } from "../models";

function PublicServicePage() {
  const navigate = useNavigate();
  const publicServiceList = useRecoilValue(PublicServiceState);
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState("");
  return (
    <Page>
      {open === false ? (
        <Box className="p-4">
          <Box>
            <button
              className="px-6 py-2 border-0 rounded-3xl"
              onClick={() => navigate("/")}
            >
              Back
            </button>
            <p className="text-justify px-4 text-[#ffffff]">{detail}</p>
          </Box>
          {publicServiceList.map((item: VNeID) => (
            <button
              className="bg-[#ffffff] w-full text-left text-[#bb4645] text-base p-3 mb-3 border-0 rounded"
              onClick={() => {
                if (item.url) {
                  openWebview({
                    url: item.url,
                    success: () => {},
                    fail: (error) => {},
                  });
                } else {
                  setDetail(item.detail);
                  setOpen(true);
                }
              }}
            >
              {item.name}
            </button>
          ))}
        </Box>
      ) : (
        <Box>
          <button
            className="px-6 py-2 border-0 mt-4 ml-4 rounded-3xl"
            onClick={() => {
              setOpen(false);
              setDetail("");
            }}
          >
            Back
          </button>
          <p className="text-justify px-4 text-[#ffffff]">{detail}</p>
        </Box>
      )}
    </Page>
  );
}

export default PublicServicePage;

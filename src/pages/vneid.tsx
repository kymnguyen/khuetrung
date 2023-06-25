import { Box, Page } from "zmp-ui";
import RestaurantDetail from "./restaurant/detail";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { vneIDState } from "../state";
import { VNeID } from "../models";

function VNeIDPage() {
  const vneidList = useRecoilValue(vneIDState);
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState("");
  return (
    <Page>
      {!open ? (
        <Box className="p-3">
          {vneidList.map((item: VNeID) => (
            <button
              className="bg-[#ffffff] w-full text-left text-[#bb4645] text-base p-3 mb-3 border-0 rounded"
              onClick={() => {
                setDetail(item.detail);
                setOpen(true);
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
            onClick={() => setOpen(false)}
          >
            Back
          </button>
          <p className="text-justify px-4 text-[#ffffff]">{detail}</p>
        </Box>
      )}
    </Page>
  );
}

export default VNeIDPage;

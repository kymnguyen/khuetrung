import React from "react";
import { useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { Box, Button, Page, Tabs, Text } from "zmp-ui";
import api from "zmp-sdk";

import BookingItem from "../components/book/booking";
import { getConfig } from "../components/config-provider";
import { DEFAULT_OA_ID } from "../constants";
import { bookingsState } from "../state";

const labels = {
  upcoming: "Sắp đến",
  finished: "Hoàn thành",
};

function ChatPage() {
  const [status, setStatus] = useState<"upcoming" | "finished">("upcoming");
  const allBookings = useRecoilValue(bookingsState);

  const handleOpenChat = () => {
    const oaId: string = getConfig((c) => c.template?.oaIDtoOpenChat || "");

    api.openChat({
      type: "oa",
      id: oaId || DEFAULT_OA_ID,
    });
  };

  return (
    <Page className="min-h-0">
      <Button
        className="chat-button"
        variant="primary"
        size="small"
        onClick={handleOpenChat}
      >
        Nhắn tin
      </Button>
    </Page>
  );
}

export default ChatPage;

import React from "react";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Avatar, Header } from "zmp-ui";
import { useRestaurant } from "../hooks";
import { getConfig } from "./config-provider";

function AppHeader() {
  const location = useLocation();

  const restaurant = useRestaurant(
    Number(new URLSearchParams(location.search).get("id"))
  );

  const title = useMemo(() => {
    return getConfig((c) => c.app.title);
  }, [location.pathname]);

  return (
    <div className="px-2 bg-white h-20 flex items-end">
      <div className="flex flex-row items-center justify-center">
        <Avatar size={40} className="" src="src/static/icons/logo.jpg" />
        <p className="ml-1 text-base font-bold">Nhân dân - doanh nghiệp số</p>
      </div>
    </div>
  );
}

export default AppHeader;

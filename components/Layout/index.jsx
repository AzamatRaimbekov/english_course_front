import React, { useEffect, useState } from "react";
import { Children } from "react";
import Header from "../Header";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeaderMobile from "../HeaderMobile";
import { MainPageApi } from "../../service/api/MainPage";

const Layout = ({ children }) => {
  const router = useRouter();
  const { data: userData } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth);
  const matches = useMediaQuery("(max-width:960px)");
  const [levelList, setLevelList] = useState(null);

  const getLevelList = async () => {
    try {
      const { data } = await MainPageApi.getLevelsList();
      setLevelList(data);
    } catch (e) {}
  };

  useEffect(() => {
    getLevelList();
    if (!token.data) {
      router.push("/auth-page");
    }
  }, []);

  const levelListFillter = levelList?.map((item) => ({
    id: item._id,
    title: item.title,
    status: item.currentLevel > userData?.level,
  }));

  return (
    <div>
      {!matches ? (
        <Header levelList={levelListFillter} />
      ) : (
        <HeaderMobile levelList={levelListFillter} />
      )}
      <main style={{ marginBottom: "40px" }}>{children}</main>
    </div>
  );
};

export default Layout;

import React, { useEffect } from "react";
import { Children } from "react";
import Header from "../Header";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import useMediaQuery from "@mui/material/useMediaQuery";
import HeaderMobile from "../HeaderMobile";
const Layout = ({ children }) => {
  const router = useRouter();
  const token = useSelector((state) => state.auth);
  const matches = useMediaQuery("(max-width:960px)");
  // useEffect(() => {
  //   if (!token.data) {
  //     router.push("/auth-page");
  //   }
  // });

  return (
    <div>
      {!matches ? <Header /> : <HeaderMobile />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;

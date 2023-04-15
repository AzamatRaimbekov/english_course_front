import { Container } from "@mui/material";
import React from "react";
import { MainPageApi } from "../service/api/MainPage";

const MainPage = ({ data }) => {
  return <Container>asdasd</Container>;
};

export default MainPage;

export async function getServerSideProps() {
  const { data } = await MainPageApi.getLevelsList();
  return { props: { data } };
}

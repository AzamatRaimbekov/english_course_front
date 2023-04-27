import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { MainPageApi } from "../service/api/MainPage";
import CardWrapper from "../components/CardsWrapper";
import CKeditor from "../components/Ckeditor";
const MainPage = ({ levelList }) => {
  // levelList - Это те данные, которые мы получили с getServerSideProps
  return (
    <Container>
      <section className="mt-40">
        <h2>Деңгээлдерден өтүп баштаңыз</h2>
        <CardWrapper data={levelList} />
      </section>
    </Container>
  );
};

export default MainPage;

// В Next js GET запросы, должны проводиться через getServerSideProps, который описан в документации Next js
// Документация по NEXT JS - https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
// Это функция нужно для SSR  - SERVER SIDE RENDERING. То есть отрисовка происходит на сервере, а не на клиентской стороне
export async function getServerSideProps() {
  const { data } = await MainPageApi.getLevelsList();
  // Тут мы прокинули дату через пропсы и будем принимать сверху
  return { props: { levelList: data } };
}

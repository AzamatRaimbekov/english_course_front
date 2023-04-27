import { Container } from "@mui/material";
import React, { useState } from "react";
import s from "./crm.module.scss";
import CreateLevels from "../../components/UI/CreateLevels";
import clsx from "clsx";
import { MainPageApi } from "../../service/api/MainPage";
import CreateExamToLevel from "../../components/UI/CreateExamToLevel";

const CRM = ({ levelList }) => {
  const CRM_TABS = [
    { id: "Деңгээлдер", body: <CreateLevels levelList={levelList} /> },
    { id: "Тесттер", body: <CreateExamToLevel levelList={levelList} /> },
    { id: "Колдонуучулар", body: <div>33</div> },
  ];
  const [tabActive, setTabActive] = useState(CRM_TABS[0].id);
  return (
    <Container>
      <div className={s.tabWrapper}>
        <div className={s.tabContainer}>
          {CRM_TABS?.map((item) => (
            <div
              onClick={() => setTabActive(item.id)}
              key={item.id}
              className={clsx(
                s.tab,
                "light-18",
                item.id === tabActive && s.tabActive
              )}
            >
              {item.id}
            </div>
          ))}
        </div>
      </div>
      <section className={s.section}>
        {CRM_TABS.map(
          (item) => item.id === tabActive && <div>{item.body}</div>
        )}
      </section>
    </Container>
  );
};

export default CRM;

// В Next js GET запросы, должны проводиться через getServerSideProps, который описан в документации Next js
// Документация по NEXT JS - https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
// Это функция нужно для SSR  - SERVER SIDE RENDERING. То есть отрисовка происходит на сервере, а не на клиентской стороне
export async function getServerSideProps() {
  const { data } = await MainPageApi.getLevelsList();
  // Тут мы прокинули дату через пропсы и будем принимать сверху
  return { props: { levelList: data } };
}

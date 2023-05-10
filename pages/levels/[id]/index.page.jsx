import { Button, Container } from "@mui/material";
import { MainPageApi } from "../../../service/api/MainPage";
import CarouselNavigation from "/components/Carusels/CarouselNavigations";
import { useState } from "react";
import HtmlParser from "../../../components/HtmlParser";

import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../slices/modalWindow";
import PassExam from "../../../components/UI/PassExam";

import s from "./level-detail.module.scss";

const LevelDetail = ({ levelData }) => {
  // readme 6
  const [extraLevelData, setExtraLevel] = useState(levelData?.parts[0]);
  // readme 1
  const dis = useDispatch();

  const { data } = useSelector((state) => state.auth);

  const getExtraLevelData = (item) => {
    setExtraLevel(item);
  };

  // Функция, которая при нажатии открывает модальное окно через REDUX
  const startToPassExam = () => {
    if (!levelData.examTest.length) return null;
    dis(
      // В эту фкнцию диспач мы пропсами(параметрами) отправляем компонент PassExam
      openModal({
        body: (
          <PassExam
            data={levelData.examTest}
            levelData={{
              title: levelData.title,
              currentLevelUser: data?.level,
              level: levelData?.currentLevel,
              userId: data?._id,
            }}
          />
        ),
      })
    );
  };

  return (
    <div>
      <Container className={s.containerWrapper}>
        <h1 className="main-title">Учурдагы деңгээл - {levelData.title} </h1>
        <HtmlParser desc={levelData.text} />
        <CarouselNavigation
          activeTab={extraLevelData?._id}
          onClick={getExtraLevelData}
          navigation={levelData.parts}
        />
        <HtmlParser desc={extraLevelData?.textExtra} />
        <div className={s.button}>
          {levelData?.examTest.length !== 0 && (
            <Button
              onClick={startToPassExam}
              variant="contained"
              color="success"
            >
              Тест тапшыра баштаңыз
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
};
export default LevelDetail;

// В Next js GET запросы, должны проводиться через getServerSideProps, который описан в документации Next js
// Документация по NEXT JS - https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props
// Это функция нужно для SSR  - SERVER SIDE RENDERING. То есть отрисовка происходит на сервере, а не на клиентской стороне

// context - Это то что принимает аргументом  getServerSideProps и возвращает парамаенты текущей страницы такие как ( QUERY, PATHNAME, LOCALE И Т Д)
export async function getServerSideProps(context) {
  // Айди мы взяли с адресной страницы под ключем id
  const id = context.query.id;
  const { data } = await MainPageApi.getLevelDetail({ id: id });
  // Тут мы прокинули дату через пропсы и будем принимать сверху
  return { props: { levelData: data } };
}

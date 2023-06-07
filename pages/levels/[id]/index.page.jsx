import { Breadcrumbs, Button, Container } from "@mui/material";
import { MainPageApi } from "../../../service/api/MainPage";
import CarouselNavigation from "/components/Carusels/CarouselNavigations";
import { useEffect, useState } from "react";
import HtmlParser from "../../../components/HtmlParser";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../slices/modalWindow";
import PassExam from "../../../components/UI/PassExam";

import BreadCrumbsCustom from "../../../components/BreadCrumbsCustom";
import s from "./level-detail.module.scss";

const LevelDetail = ({ levelData }) => {
  console.log(levelData, "levelData");
  // readme 6
  const [extraLevelData, setExtraLevel] = useState(levelData?.parts[0]);
  const [showPlayer, setShowPlayer] = useState(false);
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

  useEffect(() => setShowPlayer(true));

  return (
    <div>
      <BreadCrumbsCustom
        currentPage={{ title: levelData.title, link: `/levels/${levelData._id}` }}
      />
      <Container className={s.containerWrapper}>
        <h1 className="main-title">Учурдагы деңгээл - {levelData.title} </h1>
        <HtmlParser desc={levelData.text} />
        <div>
          {/* < /> */}
          {showPlayer && levelData?.videoLink && (
            <div className={s.playerWrapper}>
              <ReactPlayer
                width="100%"
                height="100%"
                controls
                url={levelData?.videoLink}
              />
            </div>
          )}
        </div>
        <CarouselNavigation
          activeTab={extraLevelData?._id}
          onClick={getExtraLevelData}
          navigation={levelData.parts}
        />
        <HtmlParser desc={extraLevelData?.textExtra} />
        {showPlayer && extraLevelData?.videoLinkExtra && (
          <div className={s.playerWrapper}>
            <ReactPlayer
              width="100%"
              height="100%"
              controls
              url={extraLevelData?.videoLinkExtra}
            />
          </div>
        )}
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

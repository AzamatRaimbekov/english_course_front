import { Container } from "@mui/material";

import CarouselNavigation from "/components/Carusels/CarouselNavigations";

// import s from "..levels.module.scss";

const navigation = [
  {
    title: "Не правильные глаголы",
    id: 2,
  },
  {
    title: "Правильные глаголы",
    id: 2,
  },
];

const LevelDetail = ({}) => {
  return (
    <div>
      <Container>
        <h1 className="main-title">Текущий уровень</h1>
        <CarouselNavigation navigation={navigation} />
      </Container>
    </div>
  );
};

export default LevelDetail;

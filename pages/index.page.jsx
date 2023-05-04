import { Container } from "@mui/material";
import { MainPageApi } from "../service/api/MainPage";
import CardWrapper from "../components/CardsWrapper";
import { useSelector } from "react-redux";
import HomeBanner from "../components/HomeBanner";
import HomeBannerIcon from "../assets/images/homeBanner.png";

const MainPage = ({ levelList }) => {
  // levelList - Это те данные, которые мы получили с getServerSideProps
  const { data } = useSelector((state) => state.auth);

  return (
    <>
      <HomeBanner
        // Тут мы через пропсы передаем параметры, которые будут содержаться внутри компонента(title - заголовок, subtitle = описание  )
        title="Биз менен англис тилин үйрөнүңүз"
        subtitle="industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        imageShow={HomeBannerIcon.src}
      />
      <Container>
        <section className="mt-40">
          <h2>Деңгээлдерден өтүп баштаңыз</h2>
          <CardWrapper userLevel={data?.level} data={levelList} />
        </section>
      </Container>
    </>
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

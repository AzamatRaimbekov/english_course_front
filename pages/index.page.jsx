import { Container } from "@mui/material";
import { MainPageApi } from "../service/api/MainPage";
import CardWrapper from "../components/CardsWrapper";
import { useSelector } from "react-redux";
import HomeBanner from "../components/HomeBanner";
import HomeBannerIcon from "../assets/images/homeBanner.png";
import SecondImage from "../assets/images/second.png";
import CarouselCardMain from "../components/CarouselCardMain";
import { MainPageCarousel } from "../constans/main-page";
const MainPage = ({ levelList }) => {
  // levelList - Это те данные, которые мы получили с getServerSideProps
  const { data } = useSelector((state) => state.auth);

  return (
    <>
      <HomeBanner
        // Тут мы через пропсы передаем параметры, которые будут содержаться внутри компонента(title - заголовок, subtitle = описание  )
        title="Биз менен англис тилин үйрөнүңүз"
        subtitle="Батыш дүйнөсүндөгү адамдардын көбү англис тилин жашоосунун кайсы бир мезгилинде үйрөнүшөт, бирок орто мектептик жылдарыңыз артта калса же англис тилин үйрөнүүгө эч качан аргасыз болгон болсоңуз, анда сиз англис тили эмне үчүн мынчалык маанилүү тил деп ойлонуп жаткандырсыз. Эгерде сизди Эмне үчүн англис тилин үйрөнүү керек? деп ойлонуп жатсаңыз, төмөндө англис тилин үйрөнүү эмне үчүн маанилүү экенине байланыштуу кээ бир себептерди таба аласыз."
        imageShow={HomeBannerIcon.src}
      />
      <CarouselCardMain title="Биз жондо" data={MainPageCarousel} />
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

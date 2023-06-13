import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Container } from "@mui/material";
import style from "./carousel-card-main.module.scss";
import HeadingWithNav from "../HeadingWithNav";
import CardMain from "../CardMain";

SwiperCore.use([Navigation, Autoplay]);

const CarouselCardMain = ({ title, data, buttonText }) => {
  return (
    <section className={style.section}>
      <Container>
        <HeadingWithNav
          title={title}
          arrowPrev="arrow-prev-card-main"
          arrowNext="arrow-next-card-main"
        />
        <Swiper
          rewind
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
          navigation={{
            nextEl: ".arrow-next-card-main",
            prevEl: ".arrow-prev-card-main",
          }}
          autoplay={{
            delay: 3000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
        >
          {data &&
            data.map((item) => (
              <SwiperSlide key={item?.id}>
                <CardMain
                  href={item.link}
                  item={item}
                  imageWidth={280}
                  imageHeight={200}
                  buttonText={buttonText}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default CarouselCardMain;

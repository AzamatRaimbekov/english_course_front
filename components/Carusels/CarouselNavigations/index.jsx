import Link from "next/link";
import SwiperCore, { Navigation, Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";
import style from "./styles.module.scss";
import "swiper/css";
import { Container } from "@mui/material";

SwiperCore.use([Navigation, Mousewheel]);

const CarouselNavigation = ({ navigation, onClick, activeTab }) => {

  console.log(activeTab, "activeTab")
  const router = useRouter();

  return (
    <section className={style.wrapper}>
      <Container>
        <div className={`${style.arrow} arrow-prev-navigation`}>{`<`}</div>
        <div className={`${style.arrow} arrow-next-navigation`}>{`>`}</div>
        <Swiper
          spaceBetween={0}
          slidesPerView="auto"
          mousewheel
          navigation={{
            nextEl: ".arrow-next-navigation",
            prevEl: ".arrow-prev-navigation",
          }}
        >
          {navigation?.map((item, index) => (
            <SwiperSlide key={item?.id}>
              <p
                onClick={() => onClick(item)}
                className={`
                                        regular-18
                                        ${style.link} 
                                        ${
                                          String(activeTab) ===
                                          `${String(item?._id)}`
                                            ? style.active
                                            : ""
                                        }
                                    `}
              >
                {item?.title}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default CarouselNavigation;

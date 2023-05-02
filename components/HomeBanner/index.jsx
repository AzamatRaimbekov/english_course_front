import Image from "next/image";
import s from "./home-banner.module.scss";
import clsx from "clsx";
import { Container, useMediaQuery } from "@mui/material";

const HomeBanner = ({ title, subtitle, imageShow }) => {
  const matches = useMediaQuery("(min-width:640px)");
  return (
    <section className={clsx("mt-40", s.wrapper)}>
      <Container>
        <div className={s.grid}>
          <div>
            <h1 className={`${s.title} medium-40`}>{title}</h1>
            {subtitle && (
              <div className={clsx(s.subtitle, "light-18")}>{subtitle}</div>
            )}
          </div>
          <div className={s.img}>
            <Image
              loader={(e) => e?.src}
              className={s.img}
              src={imageShow || "/test"}
              width={matches ? 505 : 260}
              height={matches ? 450 : 310}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomeBanner;

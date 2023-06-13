import Link from "next/link";
import Image from "next/image";

import style from "./card-main.module.scss";
import { useRouter } from "next/router";

const CardMain = ({ href, item, imageWidth, imageHeight, buttonText }) => {
  const router = useRouter();
  return (
    <div className={style.card}>
      <div className={style.imageWrapper}>
        <Image
          loader={(e) => e?.src}
          className={style.image}
          src={item?.img}
          width={imageWidth}
          height={imageHeight}
        />
      </div>
      <div className={style.info}>
        <h3 className={`${style.title} medium-20`}>{item?.title}</h3>
        <p className={`${style.desc} light-16`}>{item?.desc}</p>
      </div>
    </div>
  );
};

export default CardMain;

import { useState } from "react";
import { Link } from "@mui/material";
import clsx from "clsx";
import LockIcon from "@mui/icons-material/Lock";

import s from "./card-wrapper.module.scss";
import { useSelector } from "react-redux";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
const CardWrapper = ({ data, userLevel }) => {
  const [show, setShow] = useState("");
  const user = useSelector((s) => s.auth);

  const isAith = user?.data !== null;

  console.log(isAith);

  return (
    <div className={s.wrapper}>
      {/* Тут мы через пропсы принимаем массив - data, и методом map проходимся по массиву(ссылка на док сверху)    */}
      {data?.map((item) => (
        // У next js есть свой Link для перехода по страницам Link
        <Link
          className={clsx(s.link)}
          href={
            userLevel < item?.currentLevel
              ? "#"
              : isAith
              ? `/levels/${item._id} `
              : "#"
          }
        >
          <div
            // Событие onMouseLeave, onMouseEnter делает так, чтобы при наведение и обратном процессе проиходило какая-та функция
            onMouseLeave={() => setShow("")}
            onMouseEnter={() => setShow(item._id)}
            className={clsx(s.card)}
          >
            {userLevel < item?.currentLevel && show === item._id && (
              <div className={clsx(s.overlay)}>
                <div className={s.cuption}>
                  <p></p>
                  Деңгээл жетишсиз
                  <p>
                    <LockIcon />
                  </p>
                </div>
              </div>
            )}
            {!isAith && (
              <div className={clsx(s.overlay)}>
                <div className={s.cuption}>
                  <p>Катталуу керек</p>

                  <p>
                    <LockIcon />
                  </p>
                </div>
              </div>
            )}
            <div className={s.textBlock}>
              <p className={s.title}>{item.title}</p>
              <p className={s.desc}>Деңгээл - {item.currentLevel}</p>
              <p className={s.desc}>Көрүүлөр - {item.viewsCount}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CardWrapper;

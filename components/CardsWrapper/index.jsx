import { Link } from "@mui/material";
import clsx from "clsx";
import LockIcon from "@mui/icons-material/Lock";

import s from "./card-wrapper.module.scss";
import { useState } from "react";

const CardWrapper = ({ data, userLevel }) => {
  const [show, setShow] = useState("");
  return (
    <div className={s.wrapper}>
      {data?.map((item) => (
        <Link
          className={clsx(s.link)}
          href={userLevel < item?.currentLevel ? "#" : `/levels/${item._id}`}
        >
          <div
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
                  </p>{" "}
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

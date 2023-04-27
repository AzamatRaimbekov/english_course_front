import { Link } from "@mui/material";
import s from "./card-wrapper.module.scss";

const CardWrapper = ({ data }) => {
  console.log(data, "levelList");



  
  return (
    <div className={s.wrapper}>
      {data?.map((item) => (
        <Link href={`/levels/${item._id}`}>
          {/* <a> */}
            <div className={s.card}>
              <p className={s.title}>{item.title}</p>
              <p className={s.desc}>Деңгээл - {item.currentLevel}</p>
              <p className={s.desc}>Көрүүлөр - {item.viewsCount}</p>
            </div>
          {/* </a> */}
        </Link>
      ))}
    </div>
  );
};

export default CardWrapper;

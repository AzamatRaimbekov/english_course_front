import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import style from "./headig.module.scss";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const HeadingWithNav = ({ title, arrowPrev, arrowNext }) => {
  return (
    <div className={style.wrapper}>
      <h2 className={`${style.title} medium-32`}>{title}</h2>
      <div className={style.arrows}>
        <div className={`${style.arrow} ${arrowPrev}`}>
          <div id="arrow-left" className={style.icon}>
            <ArrowBackIosIcon />{" "}
          </div>
        </div>
        <div className={`${style.arrow} ${arrowNext}`}>
          <div id="arrow-right" className={style.icon}>
            <ArrowForwardIosIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadingWithNav;

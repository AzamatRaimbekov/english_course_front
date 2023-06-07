import Link from "next/link";
import s from "./bread-crumbs.module.scss";
import clsx from "clsx";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Container } from "@mui/material";
const BreadCrumbsCustom = ({
  isShowMain,
  absolute = false,
  currentPage,
  slug,
}) => {
  const IconCurrunt = <ArrowForwardIosIcon />;
  return (
    <Container className={s.container}>
      <div className={s.wrapper}>
        <Breadcrumbs maxItems={2} aria-label="breadcrumb">
          <Link className={s.link} underline="hover" color="inherit" href="/">
            Башкы
          </Link>
          <Link
            className={s.link}
            underline="hover"
            color="inherit"
            href={currentPage?.link || "/"}
          >
            {currentPage?.title}
          </Link>
        </Breadcrumbs>
      </div>
    </Container>
  );
};

export default BreadCrumbsCustom;

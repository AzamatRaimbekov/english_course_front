import { useDispatch, useSelector } from "react-redux";
import DropDownMenu from "../DropDownMunu";
import SelectMU from "../UI/SelectMU";
import s from "./header.module.scss";
import { Button, Container } from "@mui/material";
import { logout } from "../../slices/auth";
import { UserStorage } from "../../service/storage/auth";
import { useRouter } from "next/router";
import Link from "next/link";

const Header = ({ levelList }) => {
  const { data: user } = useSelector((s) => s.auth);
  const isAith = user !== null;
  const { push } = useRouter();
  const userData = useSelector((state) => state.auth);
  const dis = useDispatch();
  const logoutFromak = () => {
    if (window.confirm("Вы правда хотите выйти?")) {
      dis(logout());
      UserStorage.logoutUser();
    }
  };

  const goToAuthPage = () => {
    push("/auth-page");
  };

  const goToLevelPage = (pathId) => {
    if (!isAith) return null;
    push(`/levels/${pathId}`);
  };

  return (
    <header className={s.container}>
      <Container>
        <div className={s.header}>
          <div className={s.mainTitle}>
            <Link href="/">
              <h1>Английский курсу</h1>
            </Link>
          </div>
          <DropDownMenu
            user={isAith}
            onClick={goToLevelPage}
            list={levelList}
            className={s.select}
            title="Деңгээлдер"
          />
          {userData?.data && (
            <div className={s.wrapper}>
              <div className={s.titleWrapperText}>
                <p className={s.titleWrapper}>{userData?.data?.email}</p>
                <p className={s.titleWrapper}>
                  Деңгээл - {userData?.data?.level}
                </p>
              </div>
              <Button onClick={logoutFromak}>Чыгуу</Button>
            </div>
          )}
          {!userData?.data && <Button onClick={goToAuthPage}>Кируу</Button>}
          <p onClick={() => push("/crm")} className={s.title}>
            Мен админ
          </p>
        </div>
      </Container>
    </header>
  );
};

export default Header;

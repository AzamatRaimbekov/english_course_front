import { useDispatch, useSelector } from "react-redux";
import DropDownMenu from "../DropDownMunu";
import SelectMU from "../UI/SelectMU";
import s from "./header.module.scss";
import { Button } from "@mui/material";
import { logout } from "../../slices/auth";
import { UserStorage } from "../../service/storage/auth";
import { useRouter } from "next/router";

const Header = () => {
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

  return (
    <header className={s.container}>
      <div className={s.mainTitle}>
        <h1>Английский курсу</h1>
      </div>
      <DropDownMenu className={s.select} title="Уровни" />
      <DropDownMenu className={s.select} title="Тесты" />

      {userData?.data && (
        <div className={s.wrapper}>
          <div className={s.titleWrapperText}>
            <p className={s.titleWrapper}>
              {userData?.data?.fullName} / {userData?.data?.email}
            </p>
            <p className={s.titleWrapper}>Уровень - {userData?.data?.level}</p>
          </div>
          <Button onClick={logoutFromak}>Чыгуу</Button>
        </div>
      )}

      {!userData?.data && <Button onClick={goToAuthPage}>Кируу</Button>}
    </header>
  );
};

export default Header;

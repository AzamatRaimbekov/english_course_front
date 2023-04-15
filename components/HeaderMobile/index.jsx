import React from "react";
import s from "./header.module.scss";
import { Button, Icon } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import SelectDropDownDefault from "../UI/SelectDropDown";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/auth";
import { UserStorage } from "../../service/storage/auth";
import { useRouter } from "next/router";

const HeaderMobile = () => {
  const { push } = useRouter();
  const [show, setShow] = useState(false);
  const userData = useSelector((state) => state.auth);
  const dis = useDispatch();
  const logoutFromak = () => {
    if (window.confirm("Вы правда хотите выйти?")) {
      dis(logout());
      UserStorage.logoutUser();
    }
  };

  const goToAuthPage = () => {
    setShow(false);
    push("/auth-page");
  };
  return (
    <div className={s.wrapper}>
      <div className={s.mainTitle}>
        <h3>Английский курсу</h3>
        <div onClick={() => setShow(!show)}>
          <MenuIcon />
        </div>
      </div>
      {show && (
        <div>
          <div className={s.overlay}></div>
          <header className={s.header}>
            <SelectDropDownDefault title="Уровни" />
            <SelectDropDownDefault title="Тесты" />
            {userData?.data && (
              <div className={s.wrapper - 2}>
                <div className={s.titleWrapperText}>
                  <p className={s.titleWrapper}>
                    {userData?.data?.fullName} / {userData?.data?.email}
                  </p>
                  <p className={s.titleWrapper}>
                    Уровень - {userData?.data?.level}
                  </p>
                </div>
                <Button onClick={logoutFromak}>Чыгуу</Button>
              </div>
            )}

            {!userData?.data && <Button onClick={goToAuthPage}>Кируу</Button>}
          </header>{" "}
        </div>
      )}
    </div>
  );
};

export default HeaderMobile;

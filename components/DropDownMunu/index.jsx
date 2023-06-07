import { useState } from "react";
import clsx from "clsx";
import BlockIcon from "@mui/icons-material/Block";
import LockIcon from "@mui/icons-material/Lock";

import s from "./dropdown.module.scss";

const DropDownMenu = ({ title, className = "", list, onClick, user }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      onClick={() => setShow(!show)}
      onMouseLeave={() => setShow(false)}
      className={clsx(s.container, className)}
      onMouseEnter={() => setShow(true)}
    >
      <p>{title}</p>
      <div className={clsx(s.menu, show && s.active)}>
        {list?.map((item) => (
          <div
            onClick={() =>  !item.status && onClick(item.id)}
            className={s.wrapper}
          >
            {item.status && <LockIcon />}
            {!user && <LockIcon />}
            <p className={clsx(item.status && s.blocked)}>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropDownMenu;

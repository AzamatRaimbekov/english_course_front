import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, FC } from "react";
import s from "./select-drop-down-default.module.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const SelectDropDownDefault = ({ data, title }) => {
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const toggle = () => {
    setIsShow(!isShow);
  };
  const IconUpDown = !isShow ? (
    <KeyboardArrowUpIcon className={s.icon} />
  ) : (
    <KeyboardArrowDownIcon className={s.icon} />
  );

  return (
    <div>
      <div onClick={() => toggle()} className={s.container}>
        <p className={clsx(s.title, "medium-16 ")}>{title}</p>
        {IconUpDown}
      </div>
      <ol className={clsx(s.ol, isShow && s.active)}>
        {data?.map((link) => (
          <Link key={link.id} href={linkPath(link.page_path, router)}>
            <a href="" className={s.bottomLink}>
              <li className={clsx(s.liTitle, "light-14")}>{link.title}</li>
            </a>
          </Link>
        ))}
      </ol>
    </div>
  );
};

export default SelectDropDownDefault;

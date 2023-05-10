import s from "./user-list.module.scss";

const UserList = ({ userList }) => {
  return (
    <div className={s.wrapper}>
      {userList.map((item) => (
        <div className={s.card}>
          <div>
            <p className={s.name}>
              Аты-жөнү - <b>{item.fullName}</b>
            </p>
            <p className={s.name}>
              email - <b>{item.email}</b>
            </p>
            <p className={s.name}>
              Деңгээл- <b>{item.level}</b>
            </p>
            <div>
              Биричнчи экзамен тапшырды -{" "}
              {item.passed_first_exam ? (
                <span className={s.yes}>Ооба</span>
              ) : (
                <span className={s.no}>Жоок</span>
              )}
            </div>
          </div>
          {/* <div className={s.control}>
            <p className={s.delete}>Жок кылуу</p>
            <p className={s.edit}>өзгөртүү</p>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default UserList;

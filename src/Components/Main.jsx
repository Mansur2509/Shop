import { useDispatch, useSelector } from "react-redux";
import "./UsersPage.css";
import { useEffect } from "react";
import { fetchUsers } from "../../store/usersSlice";

const Main = () => {
    const dispatch = useDispatch();
    const { users, status, error } = useSelector((state) => state.users);
    useEffect(
      () => {
      if (status === "idle") {
        dispatch(fetchUsers());
      }
    }, [dispatch]);
  
    if (status==='loading') {
      return <div>Загрузка....</div>
    }
    if (status==='failed') {
      return <div>Ошибка{error}</div>
    }
    return (
    <>
      <div className="users">
        <div className="users__content container">
          <div className="users__content-card">
            {users.map((user, index) => (
              <div className="card" key={index}>
                <p>{user.name}</p>
                <p> Возраст: {user.age}</p>
                <p> Страна: {user.city}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
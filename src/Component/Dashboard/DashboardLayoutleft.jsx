import {
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdNotificationsNone } from "react-icons/md";
import { ImExit } from "react-icons/im";
import { useDispatch } from "react-redux";
import { userslicereducer } from "../Slice/UserSlice";
import { auth } from "../dbCollection/FireBaseConfig";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

//.active-icone
const DashboardLayoutleft = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handlerClick() {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("userdatafirebase");
        localStorage.removeItem("totalfriend");

        dispatch(userslicereducer(null));
        navigate("/");
      })
      .catch(({ code }) => {
        console.log(code);
      });
  }

  return (
    <>
      <Link to="/">
        <div className="icone-change">
          <AiOutlineHome />
        </div>
      </Link>

      <Link to="/message">
        <div className="icone-change">
          <AiOutlineMessage />
        </div>
      </Link>

      <div className="icone-change">
        <MdNotificationsNone />
      </div>

      <div className="icone-change">
        <AiOutlineSetting />
      </div>

      <div className="icone-change" onClick={handlerClick}>
        <ImExit />
      </div>
    </>
  );
};

export default DashboardLayoutleft;

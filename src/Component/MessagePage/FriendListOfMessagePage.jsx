import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import "./frienddisplay.css";

const FriendListOfMessagePage = ({ setSeleted }) => {
  const friendList = useSelector(
    (state) => state?.totalfriend?.totalfriend || []
  );

  const FriendListRender =
    friendList.length > 0 ? (
      friendList?.map((item, i) => {
        return (
          <div
            key={i}
            className="message-class-css"
            onClick={() => setSeleted({ ...item })}>
            <Avatar alt="Remy Sharp" src={""} />
            <p>{item?.displayName}</p>
          </div>
        );
      })
    ) : (
      <h1>You Have no Friend</h1>
    );

  return <>{FriendListRender}</>;
};

export default FriendListOfMessagePage;

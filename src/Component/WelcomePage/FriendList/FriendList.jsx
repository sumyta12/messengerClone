import MainListItem from "../Common/Main";
import List from "@mui/material/List";
import UseEffectFriendList from "./UseEffectFriendList";
import { ref, remove, set } from "firebase/database";
import { database } from "../../dbCollection/FireBaseConfig";
import { v4 as uuidv4 } from "uuid";
import "./index.css";

const FriendList = () => {
  const { Friendreq, uid } = UseEffectFriendList();

  const handlerRemoveFromFriendList = ({ ...rest }) => {
    remove(ref(database, "friendList/" + rest.whoSentThereq));
  };

  const handlerBlockPerson = ({ ...rest }) => {
    set(ref(database, "blocklist/" + uuidv4()), {
      ...rest,
      whoBlock: uid,
    });
  };

  const getFriendReq =
    Friendreq.length > 0 ? (
      Friendreq?.map(
        (
          { senderId, SenderName, ReciverId, ReciverName, whoSentThereq },
          i
        ) => {
          const checker = uid === senderId ? ReciverName : SenderName;
          //const comefromMessage = message ?

          return (
            <MainListItem
              key={i}
              img={"#"}
              primary={checker}
              buttonText={"Block"}
              onClick={() =>
                handlerBlockPerson({
                  senderId,
                  SenderName,
                  ReciverId,
                  ReciverName,
                })
              }
              buttonTexttwo={"Unfriend"}
              onClicktwo={() =>
                handlerRemoveFromFriendList({
                  whoSentThereq,
                })
              }
            />
          );
        }
      )
    ) : (
      <h1>No Friend Data</h1>
    );

  return (
    <List
      sx={{
        width: "100%",
      }}>
      {getFriendReq}
    </List>
  );
};

export default FriendList;

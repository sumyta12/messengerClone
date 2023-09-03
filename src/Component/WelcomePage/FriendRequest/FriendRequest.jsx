import MainListItem from "../Common/Main";
import List from "@mui/material/List";
import { ref, remove, set } from "firebase/database";
import { database } from "../../dbCollection/FireBaseConfig";
import { v4 as uuidv4 } from "uuid";
import UseEffectFriendRequest from "./UseEffectFriendRequest";

const FriendRequest = () => {
  const { getFriendreq } = UseEffectFriendRequest();

  const handlerAddFriendReq = ({ whoSentThereq, ...rest }) => {
    set(ref(database, "friendList/" + uuidv4()), {
      ...rest,
    }).then(() => {
      handlerRemoveFromAccpting({ whoSentThereq });
    });
  };

  const handlerRemoveFromAccpting = ({ whoSentThereq }) => {
    remove(ref(database, "addfriendreqs/" + whoSentThereq));
  };

  const getFriendReq =
    getFriendreq.length > 0 ? (
      getFriendreq?.map(
        ({ senderId, SenderName, ReciverId, ReciverName, whoSentThereq }) => {
          return (
            <MainListItem
              key={senderId}
              img={"#"}
              primary={SenderName}
              buttonText={"Add Friends"}
              onClick={() =>
                handlerAddFriendReq({
                  ReciverId,
                  ReciverName,
                  senderId,
                  SenderName,
                  whoSentThereq,
                })
              }
              buttonTexttwo={"cancel"}
              onClicktwo={() => handlerRemoveFromAccpting({ whoSentThereq })}
            />
          );
        }
      )
    ) : (
      <h1> You Have No request</h1>
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

export default FriendRequest;

import MainListItem from "../Common/Main";
import List from "@mui/material/List";
import { ref, onValue, set, push } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../dbCollection/FireBaseConfig";
import CircularProgress from "@mui/material/CircularProgress";
import UseEffectFriendList from "../FriendList/UseEffectFriendList";
import UseEffectFriendRequest from "../FriendRequest/UseEffectFriendRequest";

const AddFriend = () => {
  // its come from firendlist folder
  const { stillfriend, uid, displayName } = UseEffectFriendList();
  // its come from firendRequest folder
  const { firstInit, sendercancelreq } = UseEffectFriendRequest();

  const [Friend, setFriendList] = useState([]);

  useEffect(() => {
    const starCountRef = ref(database, "users/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      const getdata = Object.keys(data)
        .reduce((result, key) => {
          const user = data[key];
          user.createnewid = key;
          return [...result, user];
        }, [])
        .filter((isMechecker) => isMechecker.uid !== uid);

      const checker =
        stillfriend.length > 0
          ? getdata.filter((eachdata) => {
              return !stillfriend.some((request) => {
                return (
                  request.ReciverId === eachdata.uid ||
                  request.senderId === eachdata.uid
                );
              });
            })
          : getdata;

      setFriendList(checker);
    });
  }, [uid, stillfriend]);

  function handlerFriendRequestSend({ ReciverId, ReciverName }) {
    set(push(ref(database, "addfriendreqs")), {
      ReciverId: ReciverId,
      ReciverName: ReciverName,
      senderId: uid,
      SenderName: displayName,
    });
  }

  const handlercancelRequest = () => {
    //remove(ref(database, "addfriendreqs/" + whoSentThereq));
  };

  const getFriendList =
    Friend?.length > 0 ? (
      Friend?.map(({ uid, displayName }) => {
        if (firstInit?.includes(uid)) {
          return (
            <MainListItem
              key={uid}
              img={"#"}
              primary={displayName}
              buttonText={"Confirm"}
              onClick={() => {}}
              buttonTexttwo={"Ignore"}
              onClicktwo={() => console.log("")}
              color="success"
            />
          );
        } else if (sendercancelreq?.includes(uid)) {
          return (
            <MainListItem
              key={uid}
              img={"#"}
              primary={displayName}
              buttonText={"Cancel Request"}
              onClick={() =>handlercancelRequest()}
              buttonTexttwo={"Ignore"}
              onClicktwo={() => console.log("")}
              color="error"
            />
          );
        } else {
          return (
            <MainListItem
              key={uid}
              img={"#"}
              primary={displayName}
              buttonText={"Friend Request"}
              onClick={() =>
                handlerFriendRequestSend({
                  ReciverId: uid,
                  ReciverName: displayName,
                })
              }
              buttonTexttwo={"Ignore"}
              onClicktwo={() => console.log("")}
            />
          );
        }
      })
    ) : (
      <CircularProgress />
    );

  return (
    <List
      sx={{
        width: "100%",
      }}>
      {getFriendList}
    </List>
  );
};

export default AddFriend;

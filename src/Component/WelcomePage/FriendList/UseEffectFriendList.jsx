import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../dbCollection/FireBaseConfig";
import { useDispatch, useSelector } from "react-redux";
import UseEffectBlock from "../BlockedUser/UseEffectBlock";
import { collectTotalfriend } from "../../Slice/TotalFriendSlice";

const UseEffectFriendList = () => {
  const [Friendreq, setFriendReq] = useState([]);
  const [stillfriend, setstillfriend] = useState([]);
  const dispatch = useDispatch();
  
  //This is come from BlockedUser folder
  const { blocked } = UseEffectBlock();

  const { uid, displayName } = useSelector((state) => {
    return state.signinSlice.signin;
  });

  useEffect(() => {
    const starCountRef = ref(database, "friendList/");

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const getdata = Object.keys(data)
          .reduce((result, key) => {
            const user = data[key];
            user.whoSentThereq = key;
            return [...result, user];
          }, [])
          .filter(
            (result) => result.ReciverId === uid || result.senderId === uid
          );
        setstillfriend(getdata);

        const checker =
          blocked.length > 0
            ? getdata?.filter((item) => {
                return !blocked.some((eachblockperson) => {
                  //console.log('each',eachblockperson ,'item', item)
                  return (
                    eachblockperson.senderId === item.senderId &&
                    eachblockperson.ReciverId === item.ReciverId
                  );
                });
              })
            : getdata;

        const collected_only_friend = checker?.map((item) => {
          return {
            id: item?.senderId === uid ? item.ReciverId : item.senderId,
            displayName:
              item?.senderId === uid ? item.ReciverName : item.SenderName,
          };
        });

        dispatch(collectTotalfriend(collected_only_friend));
        localStorage.setItem('totalfriend',JSON.stringify(collected_only_friend));
        //console.log(collected_only_friend);
        //ReciverId senderId
        setFriendReq(checker);
      } else {

        setFriendReq([]);

      }
    });

  }, [blocked]);

  return {
    Friendreq,
    uid,
    displayName,
    stillfriend,
  };
};

export default UseEffectFriendList;

import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../../dbCollection/FireBaseConfig";
import { useSelector } from "react-redux";

const UseEffectgetFriendrequest = () => {
  const [firstInit, setfirstInt] = useState(null);
  const [getFriendreq, setgetFriendreq] = useState([]);
  const [sendercancelreq, setsendercancelreq] = useState([]);

  const { uid } = useSelector((state) => {
    return state.signinSlice.signin;
  });

  useEffect(() => {
    const starCountRef = ref(database, "addfriendreqs/");

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const getdata = Object.keys(data).reduce((result, key) => {
          const user = data[key];
          user.whoSentThereq = key;
          return [...result, user];
        }, []);
        //.filter((item) => item.ReciverId === uid);
        const selected_senderId = [];
        const selected_reciverId = [];
        getdata.forEach((item) => {
          if (item.ReciverId === uid) {
            selected_senderId.push(item.senderId);
          } else if (item.senderId === uid) {
            selected_reciverId.push(item.ReciverId);
          }
        });
        setfirstInt(selected_senderId);
        //  console.log(selected_reciverId )
        setsendercancelreq(selected_reciverId);
        setgetFriendreq(getdata.filter((item) => item.ReciverId === uid));
      } else {
        setgetFriendreq([]);
      }
    });
  }, [uid]);
  return { getFriendreq, uid, firstInit, sendercancelreq };
};

export default UseEffectgetFriendrequest;

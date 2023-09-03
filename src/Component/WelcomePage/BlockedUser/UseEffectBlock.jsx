import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../../dbCollection/FireBaseConfig";
import { useSelector } from "react-redux";

const UseEffectBlock = () => {
  const [blocked, setblocked] = useState([]);
  const { uid } = useSelector((state) => {
    return state.signinSlice.signin;
  });

  useEffect(() => {
    const starCountRef = ref(database, "blocklist/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const getdata = Object.keys(data)
          .reduce((result, key) => {
            const user = data[key];
            user.whobloackthisaccount = key;
            return [...result, user];
          }, [])
          .filter((result) => result.whoBlock === uid);
      // console.log(getdata,uid)
        setblocked(getdata);
      } else {
        setblocked([]);
      }
    });
  }, []);

  return {
    blocked,uid
  };
};

export default UseEffectBlock;

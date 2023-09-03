import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../dbCollection/FireBaseConfig";
import { useSelector } from "react-redux";

const MessageMiddleSection = ({ selected }) => {
  const [totalmsz, setMsz] = useState([]);
  const { uid } = useSelector((state) => {
    return state.signinSlice.signin;
  });

  useEffect(() => {
    const starCountRef = ref(database, "messageList/");
    onValue(starCountRef, (snapshot) => {
      // const data = snapshot.val();
      const mszarr = [];
      snapshot.forEach((item) => {
        // console.log(
        //   item.val().messageSenderId,
        //   uid,
        //   item.val().messageReceiverId,
        //   selected.id,
        //   item.val().messageSenderId,
        //   selected.id,
        //   item.val().messageReceiverId,
        //   uid
        // );
        if (
          item.val().messageSenderId === uid &&
          item.val().messageReceiverId === selected.id ||
          item.val().messageReceiverId === uid &&
          item.val().messageSenderId === selected.id 
        ) {
          mszarr.push(item.val());
        }

        //(item.messageSenderId,messageReceiverId)
      });
      setMsz(mszarr);
    });
  }, [selected]);

  const render = totalmsz?.map((item, i) => {
    // console.log(item);
    if (item.messageSenderId === uid) {
      return (
        <div key={i} className="message-orange">
          <p className="message-content">{item.msg}</p>
          <div className="message-timestamp-right">SMS 13:37</div>
        </div>
      );
    } else {
      return (
        <div key={i} className="message-blue">
          <p className="message-content">{item.msg}</p>
          <div className="message-timestamp-left">SMS 13:37</div>
        </div>
      );
    }
  });

  return (
    <div className="message--middle--css">
      {render}
      {
        // left side message start
      }
      {
        //   <div className="message-blue">
        //   <p className="message-content">
        //     Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
        //     similique voluptates magnam vel! Dolore dolor debitis modi quos
        //     impedit quasi maiores, cum consectetur dignissimos, amet corporis
        //     adipisci odit. Eius provident, accusantium mollitia architecto dolorem
        //     cupiditate ut beatae doloremque reiciendis molestias. Corporis maiores
        //     et exercitationem at reiciendis temporibus soluta dolorem cum?
        //   </p>
        //   <div className="message-timestamp-left">SMS 13:37</div>
        // </div>
      }
      {
        // left side message end
      }
      {
        // right side message end
      }
      {
        //   <div className="message-orange">
        //   <p className="message-content">
        //     orem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
        //     similique voluptates magnam vel! Dolore dolor debitis modi quos
        //     impedit quasi maiores, cum consectetur dignissimos, amet corporis
        //     adipisci odit. Eius provident, accusantium mollitia architecto dolorem
        //     cupiditate ut beatae do
        //   </p>
        //   <div className="message-timestamp-right">SMS 13:37</div>
        // </div>
      }
      {
        // right side message end
      }
      {
        // right side message end
      }

      {
        // right side message end
      }
    </div>
  );
};

export default MessageMiddleSection;

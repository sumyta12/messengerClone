import { useState } from "react";
import "./addComment.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { push, set,ref } from "firebase/database";
import { database } from "../dbCollection/FireBaseConfig";

const MessageBottomSection = ({ selected }) => {
  const { uid, displayName } = useSelector((state) => {
    return state.signinSlice.signin;
  });

  const [Message, setMessage] = useState("");

  const handlerSendBtnClick = () => {
    const messageobj = {
      type: "friend",
      messageSenderId: uid,
      messageSenderName: displayName,
      messageReceiverId: selected.id,
      messageReceiverName: selected.displayName,
      msg: Message,
    };

    set(push(ref(database, "messageList/")), {
      ...messageobj,
    });
    
  };

  return (
    <div className="message-bottom--css">
      <div className="add-comment">
        <div className="icone-pic">
          <AiOutlinePlusCircle />
        </div>

        <textarea
          className="comment-input"
          placeholder="Add a comment"
          value={Message}
          onChange={(event) => setMessage(event.target.value)}
        />

        <div className="send-btn-container">
          <button className="add-btn" onClick={handlerSendBtnClick}>
            reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageBottomSection;

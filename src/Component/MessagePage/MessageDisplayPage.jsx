import MessageBottomSection from "./MessageBottomSection";
import MessageHeader from "./MessageHeader";
import MessageMiddleSection from "./MessageMiddleSection";

const MessageDisplayPage = ({ singleFriend }) => {

  if (Object.keys(singleFriend).length === 0) return <h1>no friend</h1>;

  return (
    <>
      <MessageHeader selected={singleFriend} />

      <MessageMiddleSection  selected={singleFriend}/>

      <MessageBottomSection selected={singleFriend} />
    </>
  );
};

export default MessageDisplayPage;

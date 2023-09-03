import Grid from "@mui/material/Grid";
import "./index.css";
import MessageDisplayPage from "./MessageDisplayPage";
import FriendListOfMessagePage from "./FriendListOfMessagePage";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const MessagePage = () => {
  const friendList = useSelector((state) => state?.totalfriend?.totalfriend);
  const [selectedFriend, setSeletedFriend] = useState({});

  useEffect(() => {
    const selectfriend = friendList[0] || [];
    setSeletedFriend(selectfriend);
  }, [friendList]);
  return (
    <Grid
      container
      className="message-css"
      justifyContent="space-between"
      marginTop="5px">
      <Grid item xs={3} className="message--part--css">
        <div className="message--child--css">
          <h1 className="group--main--h1">Friend</h1>

          <FriendListOfMessagePage setSeleted={setSeletedFriend} />
        </div>
      </Grid>

      <Grid item xs={8} className="message--part--css">
        <div className="message--view--section">
       
            <MessageDisplayPage
              singleFriend={selectedFriend}
              setSeleted={setSeletedFriend}
            />
          
        </div>
      </Grid>
    </Grid>
  );
};

export default MessagePage;

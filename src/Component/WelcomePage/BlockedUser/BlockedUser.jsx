import MainListItem from "../Common/Main";
import List from "@mui/material/List";
import UseEffectBlock from "./UseEffectBlock";
import { ref, remove } from "firebase/database";
import { database } from "../../dbCollection/FireBaseConfig";

const BlockedUser = () => {
  const { blocked, uid } = UseEffectBlock();

  const handlerUnblock = ({blockdelete}) => {
    remove(ref(database, "blocklist/" + blockdelete));
  };

  const renderBlockUser = blocked?.map((item, i) => {
  
    const checker = uid === item.senderId ? item.ReciverName : item.SenderName;

    return (
      <MainListItem
        key={i}
        img={"#"}
        primary={checker}
        buttonText={"UnBlock"}
        onClick={() =>
          handlerUnblock({ blockdelete: item.whobloackthisaccount })
        }
      />
    );
  });

  return (
    <List
      sx={{
        width: "100%",
      }}>
      {renderBlockUser}
    </List>
  );
};

export default BlockedUser;

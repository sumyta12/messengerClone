import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

const MessageHeader = ({ selected }) => {
 
  return (
    <div className="message--header--css">
      <CardHeader
        avatar={<Avatar aria-label="human Image">R</Avatar>}
        action={""}
        title={selected?.displayName}
        subheader="Active"
      />
    </div>
  );
};

export default MessageHeader;

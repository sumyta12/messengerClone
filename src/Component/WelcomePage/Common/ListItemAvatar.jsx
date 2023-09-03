import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

const IndexListItemAvatar = ({img = '#'}) => {
    return (
        <ListItemAvatar>
          <Avatar src={img}></Avatar>
        </ListItemAvatar>
    );
};

export default IndexListItemAvatar;
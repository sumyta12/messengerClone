import MainListItem from "../Common/Main";
import List from "@mui/material/List";


const MyGroupList = () => {
    return (
        <List
        sx={{
          width: "100%",
        }}>
        <MainListItem
          img={"#"}
          primary={"Friends Reunion"}
          onClick={() => console.log("click")}
        />
      </List>
    );
};

export default MyGroupList;
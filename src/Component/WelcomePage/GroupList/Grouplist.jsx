import List from "@mui/material/List";
import MainListItem from "../Common/Main";

const Grouplist = () => {
  return (
    <List
      sx={{
        width: "100%",
      }}>
      <MainListItem
        img={"#"}
        primary={"Friends Reunion"}
        buttonText={"join"}
        onClick={() => console.log("click")}
        // buttonTexttwo={'cancel'}
        // onClicktwo={() => console.log("click 2")}
      />
    </List>
  );
};

export default Grouplist;

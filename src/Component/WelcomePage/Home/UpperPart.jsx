import Grid from "@mui/material/Grid";
import "./index.css";
import Grouplist from "../GroupList/Grouplist";
import FriendList from "../FriendList/FriendList";
import AddFriend from "../AddFriend/AddFriend";

const UpperPart = () => {
  return (
    <Grid container className="box-css">
      <Grid item xs={4} className="box--part--css">
        <div className="box--child--css">
          <h1 className="group--main--h1">Groups List</h1>
          <Grouplist />
        </div>
      </Grid>

      <Grid item xs={4} className="box--part--css">
        <div className="box--child--css">
          <h1 className="group--main--h1">Friend List</h1>
          <FriendList />
        </div>
      </Grid>

      <Grid item xs={4} className="box--part--css">
        <div className="box--child--css">
          <h1 className="group--main--h1">Add Friend</h1>
          <AddFriend />
        </div>
      </Grid>
    </Grid>
  );
};

export default UpperPart;

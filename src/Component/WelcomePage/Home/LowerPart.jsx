import Grid from "@mui/material/Grid";
import "./index.css";
import FriendRequest from "../FriendRequest/FriendRequest";
import MyGroupList from "../MyGroupList/MyGroupList";
import BlockedUser from "../BlockedUser/BlockedUser";


const LowerPart = () => {
    return (
        <Grid container className="box-css">

        <Grid item xs={4} className="box--part--css">
          <div className="box--child--css">
            <h1 className="group--main--h1">Friend Request</h1>
            <FriendRequest />
          </div>
        </Grid>
  
        <Grid item xs={4} className="box--part--css">
          <div className="box--child--css">
          <h1 className="group--main--h1">My Group List</h1>
          <MyGroupList />
          </div>
        </Grid>
  
        <Grid item xs={4} className="box--part--css">
          <div className="box--child--css">
          <h1 className="group--main--h1">Add Friend</h1>
          <BlockedUser />
          </div>
        </Grid>
  
      </Grid>
    );
};

export default LowerPart;
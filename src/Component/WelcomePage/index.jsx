import { Grid } from "@mui/material";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import "./index.css";
import DashboardLayoutleft from "../Dashboard/DashboardLayoutleft";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useRef, useState } from "react";
import ToggleModal from "../Dashboard/Modal";
import { auth, storage } from "../dbCollection/FireBaseConfig";
import {
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { userslicereducer } from "../Slice/UserSlice";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}));

const Welcomehome = () => {
  const user = useSelector((state) => state.signinSlice.signin);
  const dispatch = useDispatch();
  const imageRef = useRef(null);
  const [imagePrivew, setPreview] = useState(undefined);
  const [file, setfile] = useState(undefined);
  const { displayName } = useSelector((state) => state.signinSlice.signin);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  function handlerImageClick() {
    imageRef.current.click();
  }

  function getImageData(event) {
    setfile(event.target.files[0]);
    setPreview(URL.createObjectURL(event.target.files[0]));
  }

  const getCropData = () => {
    if (file !== undefined) {
      //console.log(file, file.name);
      const storageRef = sRef(storage, user?.uid);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log("Error: " + error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            //console.log("File available at", downloadURL);
            updateProfile(auth.currentUser, {
              photoURL: downloadURL,
            }).then(() => {
              setPreview(undefined);
              setfile(undefined);
              dispatch(userslicereducer({ ...user, photoURL: downloadURL }));
              localStorage.setItem(
                "userdatafirebase",
                JSON.stringify({
                  ...user,
                  photoURL: downloadURL,
                })
              );
            });
          });
        }
      );
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={1}>
        <div className="layer--side--color">
          <div className="picture--div--css-dashboard" onClick={handleOpen}>
            <Stack direction="row" spacing={2}>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot">
                <Avatar
                  alt="Remy Sharp"
                  className="image-avatar"
                  src={user?.photoURL}
                />
              </StyledBadge>
            </Stack>

            <div className="upload--icone">
              <AiOutlineCloudUpload />
            </div>
          </div>

          <div className="displatname-css">
            <p>
              {displayName.slice(0, 1).toUpperCase() +
                displayName.slice(1, displayName.length)}
            </p>
          </div>

          <div className="layer--side--other">
            <DashboardLayoutleft />
          </div>
        </div>
      </Grid>
      <Grid item xs={11}>
        <ToggleModal
          open={open}
          setOpen={setOpen}
          handleOpen={handleOpen}
          handlerImage={handlerImageClick}
          childimageRef={imageRef}
          getImage={getImageData}
          imageShow={imagePrivew}
          getCropData={getCropData}
        />

        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Welcomehome;

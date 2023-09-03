import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { BiSolidImageAdd } from "react-icons/bi";
import { Cropper } from "react-cropper";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ToggleModal = ({
  open,
  setOpen,
  handlerImage,
  childimageRef,
  getImage,
  imageShow,
  getCropData,
}) => {
  
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={open} type="file" onClick={handlerImage}>
          <Box sx={style} className="box--css--svg">
            {imageShow ? (
              <div className="image--modal--css">
                <Cropper
                  ref={childimageRef}
                  style={{ height: 400, width: "100%" }}
                  zoomTo={0.3}
                  initialAspectRatio={1}
                  src={imageShow}
                  viewMode={1}
                  minCropBoxHeight={5}
                  minCropBoxWidth={5}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false}
                  guides={true}
                />
                <button onClick={getCropData}>Upload Image</button>
              </div>
            ) : (
              <>
                <BiSolidImageAdd />
                <input
                  type="file"
                  ref={childimageRef}
                  onChange={getImage}
                  style={{ display: "none" }}
                />
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ToggleModal;

import IndexButton from "./Button";
import Index from "./Index";
import IndexListItemAvatar from "./ListItemAvatar";
import PrimaryText from "./PrimaryText";
import "./index.css";

const MainListItem = ({
  img,
  primary,
  buttonText = "",
  buttonTexttwo = "",
  onClick = () => {},
  onClicktwo = () => {},
  variant = "contained",
  color="secondary"
}) => {

  return (
    <Index>
      <IndexListItemAvatar img={img} />
      <PrimaryText primary={primary} />

      <div className="btn-MainList--css">
        {buttonText && (
          <IndexButton color={color}  variant={variant} onClick={onClick} >
            {buttonText}
          </IndexButton>
        )}

        {buttonTexttwo && (
          <IndexButton onClick={onClicktwo} variant="outlined" color="error">
            {buttonTexttwo}
          </IndexButton>
        )}
      </div>
    </Index>
  );
};

export default MainListItem;

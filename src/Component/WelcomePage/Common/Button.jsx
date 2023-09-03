import { Button } from "@mui/material";

const IndexButton = ({ variant = '', children, ...rest }) => {
  return (
    <Button variant={variant} {...rest}>
      {children}
    </Button>
  );
};

export default IndexButton;

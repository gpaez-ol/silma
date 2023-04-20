import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const WhiteButton = withStyles(() => ({
  root: {
    color: "#202843",
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: "25px",
    transition: "transform 450ms",
    fontWeight: "bolder",
    padding: "15px 20px",
    marginBottom: '20px',
    width: "100%",
    top: "10px",
    boxShadow: '0 2px 4px 1px rgba(32,40,67,1)',
    
    '&:hover': {
      backgroundColor: "rgb(245, 245, 255)",
      transform: "scale(1.02)",
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: "rgb(255, 255, 255)",
      border: 'none',
    },
    '&:focus': {
      backgroundColor: "rgb(255, 255, 255)",
    },
  },
}))(Button);

export { WhiteButton }
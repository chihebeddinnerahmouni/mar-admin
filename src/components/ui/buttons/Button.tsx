import { Button } from "@mui/material";


interface ButtonProps {
  text: string;
  color?: string;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  textColor?: string;
  onClick?: () => void;
}

  const mainColor = "#FF385C";

const ButtonFunc = ({ text, loading = false, type = "button", color = mainColor, textColor = "white", onClick }: ButtonProps) => {

  // console.log(loading);

  return (
    <Button
      variant="outlined"
      fullWidth
      disabled={loading}
      loading={loading}
      type={type}
      onClick={onClick ? onClick : () => {}}
      sx={{
        backgroundColor: loading ? "#999999" : color,
        color: textColor,
        cursor: loading ? "not-allowed" : "pointer",
        fontFamily: "Outfit, sans-serif",
        border: "none",
        "&:hover": {
          backgroundColor: color,
          opacity: 0.8,
        },
      }}
    >
      {loading ? "Loading..." : text}
    </Button>
  );
};

export default ButtonFunc;

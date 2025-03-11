import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";


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

  const { t } = useTranslation();

  return (
    <Button
      variant="outlined"
      fullWidth
      disabled={loading}
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
      {loading ? t("loading") + "..." : text}
    </Button>
  );
};

export default ButtonFunc;

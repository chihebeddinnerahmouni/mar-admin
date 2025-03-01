import TextField from "@mui/material/TextField";

interface InputNumberProps {
  value: string;
  setValue: (value: string) => void;
  label: string;
  error?: boolean;
  helperText?: string | false | undefined;
}

const InputNumber = ({
  value,
  setValue,
  label,
  error,
  helperText,
}: InputNumberProps) => {
  const mainColor = "#199B8A";

  return (
    <TextField
      label={label}
      value={value}
      onChange={(e: any) => setValue(e.target.value)}
      variant="standard"
          fullWidth
          type="number"
      error={error}
      helperText={helperText}
      sx={{
        "& input": {
          color: "black",
        },
        "& label.Mui-focused": {
          color: mainColor,
        },
        "& label": {
          color: "gray",
        },
        "& .MuiInput-underline:before": {
          borderBottomColor: "gray",
        },
        "& .MuiInput-underline:hover:before": {
          borderBottomColor: mainColor,
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: mainColor,
        },
      }}
    />
  );
};

export default InputNumber;

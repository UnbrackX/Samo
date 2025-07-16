import React from "react";
import { TextField } from "@mui/material";

const InputPage = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  ...props
}) => {
  return (
    <TextField
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      required={required}
      variant="outlined"
      fullWidth
      size="big"
      sx={{
        "& .MuiInputBase-root": {
          borderRadius: "8px",
        },
        "& label": {
          fontWeight: 500,
        },
        "& input": {
          fontFamily: '"Public Sans", sans-serif',
          fontSize: "0.9rem",
        },
      }}
      {...props}
    />
  );
};

export default InputPage;

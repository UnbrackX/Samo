import { Button } from "@mui/material";
import React from "react";
import { Icon } from "@iconify/react";

function AddButton() {
  return (
    <div>
      <Button
        sx={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          boxSizing: "border-box",
          WebkitTapHighlightColor: "transparent",
          cursor: "pointer",
          userSelect: "none",
          verticalAlign: "middle",
          appearance: "none",
          fontWeight: 700,
          lineHeight: 1.71429,
          fontSize: "0.875rem",
          textTransform: "unset",
          fontFamily: '"Public Sans", sans-serif',
          minWidth: "64px",
          color: "#fff",
          backgroundColor: "rgb(34, 197, 94)",
          boxShadow: "none",
          outline: 0,
          border: 0,
          margin: 0,
          textDecoration: "none",
          padding: "6px 12px",
          borderRadius: "8px",
          transition:
            "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), " +
            "box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), " +
            "border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), " +
            "color 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        variant="contained"
        startIcon={<Icon icon="ic:round-plus" />}
      >
        Qo'shish
      </Button>
    </div>
  );
}

export default AddButton;

import React from "react";
import { Button } from "@mui/material";
import { Icon } from "@iconify/react";

export default function BackButton({ onClick }) {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      startIcon={<Icon icon="material-symbols-light:arrow-back" width="20" />}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        cursor: "pointer",
        userSelect: "none",
        verticalAlign: "middle",
        appearance: "none",
        fontWeight: 700,
        lineHeight: 1.71429,
        fontSize: "0.875rem",
        textTransform: "unset",
        fontFamily: `"Public Sans", sans-serif`,
        minWidth: "64px",
        color: "inherit",
        boxShadow: "none",
        outline: 0,
        margin: 0,
        textDecoration: "none",
        padding: "5px 12px",
        borderRadius: "8px",
        transition:
          "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "rgba(145, 158, 171, 0.32)",
      }}
    >
      Orqaga
    </Button>
  );
}

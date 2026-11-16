import { AddRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

export const AddButton = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <Button
      variant="contained"
      startIcon={<AddRounded />}
      onClick={handleClick}
      sx={{ fontSize: 10 }}
    >
      Добавить операцию
    </Button>
  );
};

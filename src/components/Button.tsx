import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface CustomButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  color?: "success" | "error";
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  onClick,
  disabled,
  loading,
  color,
  children,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="contained"
      color={color}
      startIcon={loading && <CircularProgress size={20} />}
    >
      {loading ? "..." : children}
    </Button>
  );
};

export default CustomButton;

import { Box, Typography } from "@mui/material";
import React from "react";

export function SummaryCard({
  title,
  value,
  subtitle,
  color,
  children,
}: {
  title: string;
  value: string;
  subtitle?: string;
  color: string;
  children?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        minHeight: 94,
        bgcolor: "background.paper",
        borderLeft: `4px solid ${color}`,
        borderRadius: 1,
        p: 1.75,
      }}
    >
      <Typography sx={{ color: "text.secondary", fontSize: 10 }}>
        {title}
      </Typography>

      <Typography sx={{ fontSize: 21, fontWeight: 700, mt: 0.4 }}>
        {value}
      </Typography>

      {subtitle && (
        <Typography sx={{ color: "text.secondary", fontSize: 9, mt: 0.5 }}>
          {subtitle}
        </Typography>
      )}

      {children}
    </Box>
  );
}

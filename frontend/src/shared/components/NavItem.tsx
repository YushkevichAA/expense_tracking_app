import Box from "@mui/material/Box";

export function NavItem({
  icon,
  children,
  selected = false,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  selected?: boolean;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        px: 1.25,
        py: 1.1,
        mb: 0.5,
        borderRadius: 1,
        color: selected ? "primary.main" : "text.primary",
        bgcolor: selected ? "#e8f1fc" : "transparent",
        fontSize: 13,
        fontWeight: selected ? 600 : 400,
        cursor: "pointer",
      }}
    >
      {icon}
      {children}
    </Box>
  );
}

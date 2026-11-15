import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import { signOutService } from "../services/server.service";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const request = await signOutService();
      debugger;
      console.log(request);
      // перенести данные в глобальное хранилище пользовател

      navigate("/auth/sign-in");
    } catch (e) {
      console.log(e);
      // сделать лейбл отображения ошибки
    }
  };

  return (
    <Button
      fullWidth
      variant="contained"
      onClick={handleClick}
      size="large"
      sx={{ mt: 3, mb: 2, py: 1.2 }}
    >
      "Выйти из системы"
    </Button>
  );
};

import { useLoaderData } from "react-router";
import { LogoutButton } from "../widgets/Logout";

export const MainPage = () => {
  const loadedUser = useLoaderData();
  console.log(loadedUser);
  return (
    <div>
      <div>
        <LogoutButton />
      </div>
      Добро пожаловать {loadedUser.username}
    </div>
  );
};

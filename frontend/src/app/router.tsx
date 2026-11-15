import { createBrowserRouter } from "react-router";
import { AuthPage } from "../pages/AuthPage";
import { SignInForm } from "../widgets/SignInForm";
import { SignUpForm } from "../widgets/SignUpForm";
import { checkAuthBackend, signOutService } from "../services/server.service";
import { redirect } from "react-router";
import { MainPage } from "../pages/MainPage";

const checkAuth = async () => {
  try {
    const request = await checkAuthBackend();
    // перенести данные в глобальное хранилище пользователя
    return request.data;
    // закинуть данные пользователя в глобальное хранилище после получения данных
  } catch (e) {
    // если нет то переотправляем пользователя на страницу регистрации
    console.log(e);
    return redirect("/auth/sign-in");
  }
};

export const router = createBrowserRouter(
  [
    {
      path: "/auth",
      // на этапе  открытия приложения должно быть сделана проверка что пользователь все еще в системе или сделать редирект на страницу авторизации
      Component: AuthPage,
      children: [
        { path: "sign-in", Component: SignInForm },
        {
          path: "sign-up",
          Component: SignUpForm,
        },
      ],
    },

    {
      path: "/",

      // на этапе  открытия приложения должно быть сделана проверка что пользователь все еще в системе или сделать редирект на страницу авторизации
      Component: MainPage,
      loader: checkAuth,
    },
  ],
  { basename: "/" },
);

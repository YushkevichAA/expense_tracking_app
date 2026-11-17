import { createBrowserRouter } from "react-router";
import { AuthPage } from "../pages/AuthPage";
import { SignInForm } from "../widgets/SignInForm";
import { SignUpForm } from "../widgets/SignUpForm";
import { checkAuthService } from "../services/server.service";
import { redirect } from "react-router";
import { MainPage } from "../pages/MainPage";
import { TuitionPaymentsPage } from "../pages/TuitionPaymentsPage";
import { OverviewPage } from "../pages/OverviewPage";
import { OperationsPage } from "../pages/OperationPage";

const checkAuth = async () => {
  try {
    const { data: userData } = await checkAuthService();

    // закинуть данные пользователя в глобальное хранилище после получения данных
    return userData;
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
      children: [
        {
          index: true,
          // Component: OverviewPage,e
          loader: () => redirect("/operations"),
          handle: { title: "Обзор" },
        },
        {
          path: "operations",
          Component: OperationsPage,
          handle: { title: "Операции" },
        },
        {
          path: "tuition",
          Component: TuitionPaymentsPage,
          handle: { title: "Платежи за обучение" },
        },
      ],
    },
  ],
  { basename: "/" },
);

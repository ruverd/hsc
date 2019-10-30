import DefaultLayout from "../components/Layout/Default/DashboardLayout.vue";

// GeneralViews
import NotFound from "../components/GeneralViews/Views/NotFoundPage.vue";

import Login from "src/pages/Login";
import Register from "src/pages/Register";

const Dashboard = () => import("src/pages/Dashboard");
const User = () => import("src/pages/User");
const Speciality = () => import("src/pages/Speciality");
const StepRegister = () => import("src/pages/StepRegister");
const ChangePassword = () => import("src/pages/ChangePassword");

let loginPage = {
  path: "/login",
  name: "Login",
  component: Login
};

let registerPage = {
  path: "/register",
  name: "Register",
  component: Register
};

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "user",
        name: "User",
        component: User
      },
      {
        path: "speciality",
        name: "Speciality",
        component: Speciality
      },
      {
        path: "step-register",
        name: "Cadastro Médico",
        component: StepRegister
      },
      {
        path: "change-password",
        name: "Alterar Senha",
        component: ChangePassword
      }
    ]
  },
  loginPage,
  registerPage,
  {
    path: "/admin",
    component: DefaultLayout,
    redirect: "/dashboard"
  },
  {
    path: "*",
    component: NotFound
  }
];

export default routes;

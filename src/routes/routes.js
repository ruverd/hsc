import DefaultLayout from '../components/Layout/Default/DashboardLayout.vue'

// GeneralViews
import NotFound from '../components/GeneralViews/Views/NotFoundPage.vue'

// Pages
import Login from 'src/components/Auth/Views/Login.vue'
import Register from 'src/components/Auth/Views/Register.vue'
import Lock from 'src/components/Auth/Views/Lock.vue'

// Dashboard pages
const Dashboard = () => import(/* webpackChunkName: "widgets" */ 'src/components/Dashboard/Views/Dashboard.vue')

// User Page
const User = () => import(/* webpackChunkName: "widgets" */ 'src/components/User/Views/User.vue')
const Speciality = () => import(/* webpackChunkName: "widgets" */ 'src/components/Speciality/Views/Speciality.vue')

// Cadastro Médico
const StepRegister = () => import(/* webpackChunkName: "forms" */ 'src/components/StepRegister/Views/Register.vue');
const ChangePassword = () => import(/* webpackChunkName: "forms" */ 'src/components/ChangePassword/Views/Password.vue');

let loginPage = {
  path: '/login',
  name: 'Login',
  component: Login
}

let registerPage = {
  path: '/register',
  name: 'Register',
  component: Register
}

let lockPage = {
  path: '/lock',
  name: 'Lock',
  component: Lock
}

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'user',
        name: 'User',
        component: User
      },
      {
        path: 'speciality',
        name: 'Speciality',
        component: Speciality
      },
      {
        path: 'step-register',
        name: 'Cadastro Médico',
        component: StepRegister
      },
      {
        path: 'change-password',
        name: 'Alterar Senha',
        component: ChangePassword
      }
    ]
  },
  loginPage,
  registerPage,
  lockPage,
  {
    path: '/admin',
    component: DefaultLayout,
    redirect: '/dashboard'
  },
  {path: '*', component: NotFound}
];

export default routes

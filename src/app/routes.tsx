import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { LoginScreen } from "./components/LoginScreen";
import { SignupScreen } from "./components/SignupScreen";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { HomeScreen } from "./components/HomeScreen";
import { BillsScreen } from "./components/BillsScreen";
import { BudgetScreen } from "./components/BudgetScreen";
import { GoalsScreen } from "./components/GoalsScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { DebtScreen } from "./components/DebtScreen";
import { IncomeScreen } from "./components/IncomeScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomeScreen />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path: "/signup",
    element: <SignupScreen />,
  },
  {
    path: "/onboarding",
    element: <OnboardingScreen />,
  },
  {
    path: "/app",
    element: <Layout />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: "bills", element: <BillsScreen /> },
      { path: "budget", element: <BudgetScreen /> },
      { path: "goals", element: <GoalsScreen /> },
      { path: "profile", element: <ProfileScreen /> },
      { path: "debt", element: <DebtScreen /> },
      { path: "income", element: <IncomeScreen /> },
    ],
  },
]);

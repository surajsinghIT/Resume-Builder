import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "../components/common/Loader";
import { HOME, TEMPLATES, BUILDER, DASHBOARD, PRICING, FEATURES, ABOUT, CONTACT,SIGNIN,SIGNUP,LOGOUT, TEMPLATESELECTOR } from "../utils/RouteList";
import AuthenticateRoute from "./AuthenticateRoute";
import TemplateSelector from "../components/pages/Templates/TemplateSelector";

// Lazy load all pages
const HomePage = lazy(()=> import("../components/pages/Home/HomePage"))
const TemplatesPage = lazy(()=> import("../components/pages/Templates/TemplatesPage"))
const BuilderPage = lazy(() => import("../components/pages/Builder/BuilderPage"));
const DashboardPage = lazy(() => import("../components/pages/Dashboard/DashboardPage"));
const PricingPage = lazy(() => import("../components/pages/Pricing/PricingPage"));
const FeaturesPage = lazy(() => import("../components/pages/Features/FeaturesPage"));
const AboutPage = lazy(() => import("../components/pages/About/AboutPage"));
const ContactPage = lazy(() => import("../components/pages/Contact/ContactPage"));
const SignInPage = lazy(()=> import('../components/pages/Auth/SignIn'))
const SignUpPage = lazy(()=> import('../components/pages/Auth/SignUp'))
const LogoutPage = lazy(()=> import('../components/pages/Auth/Logout'))

function MainRoutes() {
  return (
    <Suspense
      fallback={       
          <Loader />       
      }
    >
      <Routes>
        <Route element={<AuthenticateRoute/>}>
          <Route path={HOME} element={<HomePage />} />
          <Route path={TEMPLATESELECTOR} element={<TemplateSelector />} />
          <Route path={TEMPLATES} element={<TemplatesPage />} />
          <Route path={BUILDER} element={<BuilderPage />} />
          <Route path={DASHBOARD} element={<DashboardPage />} />
          <Route path={PRICING} element={<PricingPage />} />
          <Route path={FEATURES} element={<FeaturesPage />} />
          <Route path={ABOUT} element={<AboutPage />} />
          <Route path={CONTACT} element={<ContactPage />} />        
          <Route path={LOGOUT} element={<LogoutPage />} />
        </Route>
        <Route path={SIGNIN} element={<SignInPage />} />
        <Route path={SIGNUP} element={<SignUpPage />} />
      </Routes>
    </Suspense>
  );
}

export default MainRoutes;
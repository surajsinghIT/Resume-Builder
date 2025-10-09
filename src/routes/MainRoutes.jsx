import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "../components/common/Loader";
import { HOME, TEMPLATES, BUILDER, DASHBOARD, PRICING, FEATURES, ABOUT, CONTACT,SIGNIN,SIGNUP,LOGOUT } from "../utils/RouteList";

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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <Loader />
        </div>
      }
    >
      <Routes>
        <Route path={HOME} element={<HomePage />} />
        <Route path={TEMPLATES} element={<TemplatesPage />} />
        <Route path={BUILDER} element={<BuilderPage />} />
        <Route path={DASHBOARD} element={<DashboardPage />} />
        <Route path={PRICING} element={<PricingPage />} />
        <Route path={FEATURES} element={<FeaturesPage />} />
        <Route path={ABOUT} element={<AboutPage />} />
        <Route path={CONTACT} element={<ContactPage />} />
        <Route path={SIGNIN} element={<SignInPage />} />
        <Route path={SIGNUP} element={<SignUpPage />} />
        <Route path={LOGOUT} element={<LogoutPage />} />
      </Routes>
    </Suspense>
  );
}

export default MainRoutes;
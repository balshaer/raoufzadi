import "../app/css/globals.css";
import AppRoutes from "@/routes/__routes";
import { useTranslation } from "react-i18next";
import LoadingPage from "./pages/LoadingPage";
import { useEffect, useState } from "react";
import { ScrollToTop } from "./components/ui/ScrollToTop";
import { Toaster } from "sonner";

const App: React.FC = () => {
  useTranslation();
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div dir="ltr" className="App z-40">
      
      <ScrollToTop />
      <Toaster />
      {isloading && <LoadingPage />}
      <AppRoutes />
    </div>
  );
};

export default App;

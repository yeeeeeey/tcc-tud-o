import { useState } from "react";
import LogisticsHero from "./components/LogisticsHero";
import ComoFuncionaSection from "./components/ComoFunciona";
import VantagensSection from "./components/Vantagens";
import PlanosSection from "./components/Planos";
import FooterSection from "./components/Footer";
import SignupForm from "./pages/Cadastro";
import LoginScreen from "./pages/Login";
import DashboardScreen from "./pages/Dashboard";

function App() {
  const [tela, setTela] = useState("home");
  const [usuario, setUsuario] = useState(null);

  if (tela === "login") {
    return (
      <LoginScreen
        onGoToSignup={() => setTela("cadastro")}
        onLoginSuccess={(u) => {
          setUsuario(u);
          setTela("dashboard");
        }}
      />
    );
  }

  if (tela === "cadastro") {
    return <SignupForm onGoToLogin={() => setTela("login")} />;
  }

  if (tela === "dashboard") {
    return (
      <DashboardScreen
        usuario={usuario}
        onSair={() => {
          setUsuario(null);
          setTela("home");
        }}
      />
    );
  }

  return (
    <>
      <LogisticsHero onEntrar={() => setTela("login")} />
      <ComoFuncionaSection />
      <VantagensSection />
      <PlanosSection />
      <FooterSection />
    </>
  );
}

export default App;

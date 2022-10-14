import { BrowserRouter, HashRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import PrincipalHeader from "./ui/components/PrincipalHeader";
import PrincipalNavBar from "./ui/components/PrincipalNavBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <PrincipalNavBar />
        <PrincipalHeader />

        <AppRouter />
      </BrowserRouter>
    </>

  );
}

export default App;

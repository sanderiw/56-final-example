import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthContextComponent } from "../contexts/authContext";

import Navbar from "./Navbar";

import Signup from "./auth/Signup";
import Login from "./auth/Login";

import ProjectList from "./project/ProjectList";

function App() {
  return (
    <BrowserRouter>
      <AuthContextComponent>
        <Navbar />
        <div className="container mt-5">
          {/* ATENÇÃO: essas rotas NÃO tem relação com as rotas do backend, portanto os nomes podem ser diferentes */}
          <Route path="/cadastro-usuario" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/projetos" component={ProjectList} />
        </div>
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;

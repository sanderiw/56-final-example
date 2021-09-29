import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthContextComponent } from "../contexts/authContext";

import Navbar from "./Navbar";

import Signup from "./auth/Signup";
import Login from "./auth/Login";
import PrivateRoute from "./auth/PrivateRoute";

import ProjectList from "./project/ProjectList";
import ProjectDetail from "./project/ProjectDetail";
import ProjectDelete from "./project/ProjectDelete";
import ProjectCreate from "./project/ProjectCreate";
import ProjectEdit from "./project/ProjectEdit";
import TaskEdit from "./project/TaskEdit";
import TaskDelete from "./project/TaskDelete";

function App() {
  return (
    <BrowserRouter>
      <AuthContextComponent>
        <Navbar />
        <div className="container mt-5">
          {/* ATENÇÃO: essas rotas NÃO tem relação com as rotas do backend, portanto os nomes podem ser diferentes */}
          <Route path="/cadastro-usuario" component={Signup} />
          <Route path="/login" component={Login} />
          <Route exact path="/projetos" component={ProjectList} />
          <Route exact path="/criar-projeto" component={ProjectCreate} />
          <Switch>
            <PrivateRoute
              exact
              path="/projeto/deletar/:id"
              component={ProjectDelete}
            />
            <Route exact path="/projeto/:id" component={ProjectDetail} />
            <Route exact path="/editar-projeto/:id" component={ProjectEdit} />
            <Route exact path="/editar-task/:id" component={TaskEdit} />
            <Route exact path="/deletar-task/:id" component={TaskDelete} />
          </Switch>
        </div>
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;

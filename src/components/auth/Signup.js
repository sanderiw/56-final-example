import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import TextInput from "../TextInput";

import { authContext } from "../../contexts/authContext";

function Signup() {
  // o useState é um Hook (função) que retorna uma array. No índice 0, está o seu state (que não é mais obrigatório como objeto, agora pode ser qualquer tipo de dado, como arrays, booleans ou strings) e no índice 1, está uma função para atualizar esse state. Assim como nas classes, toda vez que a função de atualização de state for invocada, o componente é re-renderizado
  const [state, setState] = useState({ email: "", password: "", name: "" });

  const history = useHistory();

  const { loggedInUser, setLoggedInUser } = useContext(authContext);

  useEffect(() => {
    // Caso o usuário já esteja logado, redirecione para página principal
    if (loggedInUser.token) {
      history.push("/projetos");
    }
  }, [loggedInUser, history]);

  function handleChange(event) {
    // CUIDADO: diferente das classes, a função de atualização de state dos Hooks é DESTRUTIVA, ou seja, ela substitui completamente o valor do state pelo que ela recebe como argumento. Dessa forma, precisamos salvar o state anterior antes de atualizar usando o operador spread
    setState({ ...state, [event.target.name]: event.target.value });
    //         ^ espalha o state anterior    ^ atualiza a chave do input atual
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/signup",
        state
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1>Cadastro de novo usuário</h1>
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Nome"
          name="name"
          id="signupFormName"
          type="text"
          required
          onChange={handleChange}
          value={state.name}
        />

        <TextInput
          label="E-mail"
          name="email"
          id="signupFormEmail"
          type="email"
          required
          onChange={handleChange}
          value={state.email}
        />

        <TextInput
          label="Senha"
          name="password"
          id="signupFormPassword"
          type="password"
          required
          onChange={handleChange}
          value={state.password}
        />

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;

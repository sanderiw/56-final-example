import { useState, useEffect } from "react";

import api from "../../apis/api";

function ProjectList() {
  const [projects, setProjects] = useState([]);

  // O useEffect recebe uma função callback e um array, e toda vez que qualquer elemento da array sofra qualquer tipo de alteração, a função callback é executada. Caso a array esteja vazia, o useEffect executa sua callback uma vez assim que o componente é renderizado, substituindo o componentDidMount
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await api.get("/project"); // api é a instância pré-configurada do Axios que injeta automaticamente o token de autenticação definida no arquivo apis/api.js
        setProjects([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProjects();
  }, []);

  return (
    <div>
      <table className="table table-hover">
        <thead className="table-primary">
          <tr>
            <th>Nome</th>
            <th>Data Início</th>
            <th>Responsável</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((projectObj) => {
            return (
              <tr>
                <td>{projectObj.name}</td>
                <td>
                  {
                    new Date(projectObj.startDate)
                      .toLocaleString()
                      .split(",")[0]
                  }
                </td>
                <td>{projectObj.projectOwner.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectList;

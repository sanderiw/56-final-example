import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import api from '../../apis/api';

function TaskDelete() {
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        async function deleteTask() {
          try {
            const taskData = await api.get(`/task/${id}`)
            const response = await api.delete(`/task/${id}`);
            //console.log(taskData.data.projectId)
            console.log(response.data);
            history.push(`/projeto/${taskData.data.projectId}`);
          } catch (err) {
            console.error(err);
          }
        }
        deleteTask();
      }, [id, history]);

      return <div>Deletando...</div>;
}

export default TaskDelete;

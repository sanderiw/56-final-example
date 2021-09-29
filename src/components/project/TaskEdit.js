import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../apis/api';
import TextInput from '../TextInput';
import SelectInput from '../SelectInput';

function TaskEdit() {
    const [state, setState] = useState({
        description: '',
        status: '',
    });

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        async function fetchTask() {
            try {
                const response = await api.get(`task/${id}`);
                setState({ ...response.data });
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchTask();
    }, [id]);

    function handleChange(event) {
        setState({ ...state, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const result = await api.patch(`task/${id}`, { ...state });
            console.log(result);
            history.push(`/projeto/${state.projectId}`);
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <TextInput
                label='Descrição'
                id='taskFormDescription'
                name='description'
                onChange={handleChange}
                value={state.description}
            />

            <SelectInput
                label='Status'
                id='taskFormStatus'
                name='status'
                onChange={handleChange}
                value={state.status}
                items={['A fazer', 'Fazendo', 'Feito']}
            />

            <div className='mb-3'>
                <button className='btn btn-primary mt-4'>Editar tarefa</button>
            </div>
        </form>
    );
}

export default TaskEdit;

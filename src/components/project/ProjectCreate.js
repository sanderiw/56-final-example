import { useState, useContext } from 'react';

import api from '../../apis/api';
import { authContext } from '../../contexts/authContext';
import { useHistory } from 'react-router-dom';
import TextInput from '../TextInput';

function ProjectCreate() {
    const [state, setState] = useState({
        name: '',
        description: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        budget: 0,
    });
    const history = useHistory();
    const { loggedInUser } = useContext(authContext);

    function handleChange(event) {
        setState({ ...state, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await api.post('/project', {
                ...state,
                projectOwner: loggedInUser.user._id,
            });
            console.log(response.data);
            setState({
                name: '',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
            });

            history.push("/projetos")
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextInput
                label='Nome do Projeto'
                id='projectFormName'
                name='name'
                onChange={handleChange}
                value={state.name}
            />
            <TextInput
                label='Descrição'
                id='projectFormDescription'
                name='description'
                onChange={handleChange}
                value={state.description}
            />
            <TextInput
                type='date'
                label='Data inicial'
                id='projectFormStartDate'
                name='startDate'
                onChange={handleChange}
                value={state.startDate}
            />
            <TextInput
                type='date'
                label='Data final'
                id='projectFormEndDate'
                name='endDate'
                onChange={handleChange}
                value={state.endDate}
            />
            <TextInput
                type='number'
                label='Orçamento'
                id='projectBudget'
                name='budget'
                onChange={handleChange}
                value={state.budget}
            />

            <div className='mb-3'>
                <button className='btn btn-primary'>Criar projeto</button>
            </div>
        </form>
    );
}

export default ProjectCreate;

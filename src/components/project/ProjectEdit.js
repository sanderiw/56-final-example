import { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { authContext } from '../../contexts/authContext';
import api from '../../apis/api';
import TextInput from '../TextInput';

function ProjectEdit() {
    const [state, setState] = useState({
        name: '',
        description: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        budget: 0,
    });
    const history = useHistory();
    const { loggedInUser } = useContext(authContext);
    const { id } = useParams();

    useEffect(() => {
        async function fetchProject() {
            try { 
                const response = await api.get(`/project/${id}`); 
                setState({...response.data, startDate: state.startDate.split('T')[0], endDate: state.endDate.split('T')[0]});
                console.log(response.data)
            
            } catch (err) {
                console.error(err);
            }
        }
        fetchProject();
    }, [id]);

    function handleChange(event) {
        setState({...state, [event.target.name]: event.target.value})
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            api.patch(`project/${id}`, {
                ...state
            })
            history.push("/projetos")

        } catch (error) {
            console.error(error)
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
                <button className='btn btn-primary'>Atualizar projeto</button>
            </div>
        </form>
    );
}

export default ProjectEdit;

import { useHistory, useParams } from 'react-router-dom';
import ConfirmationModal from '../ConfirmationModal';

function TaskCard(props) {
    const history = useHistory();

    return (
        <div
            className='border rounded p-2 shadow-sm bg-light m-2'
            key={props.taskObj._id}
        >
            <button
                className='btn btn-sm btn-warning mb-2 me-2'
                onClick={() => {
                    history.push(`/editar-task/${props.taskObj._id}`);
                }}
            >
                Editar
            </button>
            <button
                className='btn btn-sm btn-danger mb-2'
                onClick={() => props.handleModalOpen()}
            >
                Deletar
            </button>
            <p className='mb-0'>{props.taskObj.description}</p>
            <small
                style={{ fontSize: '10px' }}
                className='text-muted fst-italic'
            >
                {new Date(props.taskObj.startDate).toLocaleString()}
            </small>
            <ConfirmationModal
                show={props.showModal}
                handleClose={props.handleModalClose}
                handleConfirmation={() => {
                  history.push(`/deletar-task/${props.taskObj._id}`)
                }}
            />
        </div>
    );
}

export default TaskCard;

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTasks, createTask, deleteTask } from './taskSlice';
import { StatusEnums } from '../../app/enums/status';

const TaskForm = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.task.data);
    const [formData, setFormData] = useState({
        title: '',
        details: '',
        start_date: '',
        end_date: '',
        status: 1
    });

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createTask(formData))
    }

    const handleDelete = (id) => {
        dispatch(deleteTask(id));
    }
    
    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);

    useEffect(() => {
        if (tasks) {
            console.log('Redux state "data" is now updated:', tasks);
        }
    }, [tasks])

    const content = (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={formData.title} placeholder="Title" onChange={handleChange} />
                <textarea name="details" value={formData.details} placeholder="Details" onChange={handleChange}></textarea>
                <input type="date" name="start_date" value={formData.start_date} placeholder="Start Date" onChange={handleChange} />
                <input type="date" name="end_date" value={formData.end_date} placeholder="End Date" onChange={handleChange} />
                <button type="submit">Submit</button>
            </form>

            <h3>Tasks</h3>
            {
                tasks.length > 0 ?  
                    tasks.map((task, index) => (
                        <div key={index}>
                            <div>{ task.title }</div>
                            <div>{ task.details }</div>
                            <div>{ task.start_date }</div>
                            <div>{ task.end_date }</div>
                            <div>{ StatusEnums.filter((st) => st.value === task.status).map(stat => stat.desc) }</div>
                            <button onClick={ () => handleDelete(task._id) }>Delete</button>
                        </div>
                    )) : 'No Tasks'
            }
            
        </div>
    );

    return content;
}

export default TaskForm

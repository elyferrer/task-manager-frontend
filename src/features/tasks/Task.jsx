import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTasks, createTask, deleteTask, updateTask } from './taskSlice';
import { StatusEnums } from '../../app/enums/status';

const Task = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.task.data);
    const [showForm, setShowForm] = useState(false);
    const [selected, setSelected] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        details: '',
        start_date: '',
        start_time: '',
        end_date: '',
        end_time: '',
        status: 1
    });

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selected) {
                await dispatch(updateTask({ id: selected, formData })).unwrap();
            } else {
                await dispatch(createTask(formData)).unwrap();
            }

            setFormData({
                title: '',
                details: '',
                start_date: '',
                start_time: '',
                end_date: '',
                end_time: '',
                status: 1
            });

            setSelected('');
            setShowForm(false)
            
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleAddNewForm = () => {
        setFormData({
            title: '',
            details: '',
            start_date: '',
            start_time: '',
            end_date: '',
            end_time: '',
            status: 1
        });

        setSelected('');
        setShowForm(true);
    }

    const handleUpdateForm = (id, data) => {
        setSelected(id);

        setFormData({
            title: data.title,
            details: data.details,
            start_date: new Date(data.start_date).toLocaleDateString('en-CA'),
            start_time: formatTime(data.start_date),
            end_date: new Date(data.end_date).toLocaleDateString('en-CA'),
            end_time: formatTime(data.end_date),
            status: data.status
        });

        setShowForm(true);
    }

    function formatTime (date) {
        const options = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        };

        const formattedTime = new Intl.DateTimeFormat('en-US', options).format(new Date(date));
        
        return formattedTime;
    }

    const handleDelete = async (id) => {
        if(confirm("Are you sure you want to delete this task?")) await dispatch(deleteTask(id));
    }
    
    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);

    useEffect(() => {}, [tasks])

    const content = (
        <div className=''>
            <div className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-60 flex justify-center p-2 items-center ${showForm ? 'visible pointer-events-auto' : 'hidden pointer-events-none'}`}>
                <form onSubmit={handleSubmit} className='w-96 bg-white p-3 rounded'>
                    <div className='m-2 text-center'>
                        <h1 className='text-xl'>{`${selected ? 'Update Task' : 'Create New Task'}`}</h1>
                    </div>
                    <div className='m-2'>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            Title
                        </span>
                        <input type="text" className="w-full rounded p-2 border border-gray-400" name="title" value={formData.title} placeholder="Enter Title" onChange={handleChange} />
                    </div>

                    <div className='m-2'>
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            Details
                        </span>
                        <textarea name="details" className="w-full rounded p-2 resize-none border border-gray-400" value={formData.details} placeholder="Enter Details" onChange={handleChange}></textarea>
                    </div>

                    <div className='m-2 grid grid-cols-2 gap-2'>
                        <div>
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                Start Date
                            </span>
                            <input type="date" name="start_date" className='rounded p-2 w-full border border-gray-400' value={formData.start_date} onChange={handleChange} />
                        </div>

                        <div>
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                Start Time
                            </span><br />
                            <input type="time" name="start_time" className='rounded p-2 w-full border border-gray-400' id="start_time" value={formData.start_time} onChange={handleChange} />
                        </div>
                    </div>
                    
                    <div className='m-2 grid grid-cols-2 gap-2'>
                        <div>
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                End Date
                            </span>
                            <input type="date" name="end_date" className='rounded p-2 w-full border border-gray-400' value={formData.end_date} onChange={handleChange} />
                        </div>
                        <div>
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                End Time
                            </span><br />
                            <input type="time" name="end_time" className='rounded p-2 w-full border border-gray-400' id="end_time" value={formData.end_time} onChange={handleChange} />
                        </div>
                    </div>

                    {
                        selected ? 
                            <div className='m-2'>
                                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                                    Status
                                </span>
                                <select name="status" id="status" className='rounded p-2 w-full border border-gray-400 bg-white' 
                                    value={formData.status} onChange={handleChange}>
                                    { StatusEnums.map((stat, index) => (
                                        <option key={index} value={`${stat.value}`}>{stat.desc}</option>
                                    ))}
                                </select>
                            </div> 
                            : ''
                    }
                    

                    <div className='m-2'>
                        <button type="submit" className='w-full bg-blue-800 text-white mt-4 p-2 rounded'>Submit</button>
                        <button type="button" className='w-full mt-2 p-2' onClick={() => setShowForm(false)}>Cancel</button>
                    </div>
                </form>
            </div>
            

            <div className='w-full sm:w-3/5 md:w-2/5 m-auto grid grid-cols-1 gap-2'>
                {/* <div className='mx-3 text-center p-5'>
                    <h3 className='text-3xl font-bold'>Tasks</h3>
                </div> */}
                <div className='grid grid-cols-3 gap-2 m-3'>
                    <button onClick={handleAddNewForm} className='text-white bg-blue-600 p-2 rounded'>Add New Task</button>
                </div>
                
                <div className='mx-3'>
                    {
                        tasks.length > 0 ?  
                            tasks.map((task, index) => {
                                const stat = StatusEnums.filter((st) => st.value === task.status)[0];
                                let borderColor = '';
                                let textColor = '';
                                let bgColor = '';
                                const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                                
                                const endDate = new Date(task.end_date).toLocaleDateString();
                                const isDue = stat.value !== 3 && endDate == new Date().toLocaleDateString();

                                switch(stat.value) {
                                    case 1: // Open
                                        borderColor = 'border-gray-200';
                                        textColor = 'text-gray-800';
                                        bgColor = 'bg-gray-100';
                                        break;
                                    case 2: // In Progress
                                        borderColor = 'border-blue-200';
                                        textColor = 'text-blue-800';
                                        bgColor = 'bg-blue-100';
                                        break;
                                    case 3: // Done
                                        borderColor = 'border-green-200';
                                        textColor = 'text-green-800';
                                        bgColor = 'bg-green-100';
                                        break;
                                    case 4: // Overdue
                                        borderColor = 'border-red-200';
                                        textColor = 'text-red-800';
                                        bgColor = 'bg-red-100';
                                        break;
                                }
                                
                                return (
                                    <div key={index} 
                                        className={`w-full px-5 mt-2 py-3 grid grid-cols-3 gap-1 rounded border border-4 ${
                                            borderColor
                                        }`}>
                                        <div className='col-span-3'>
                                            <span className={`inline-block  text-xs font-semibold px-2.5 py-0.5 rounded ${textColor} ${bgColor}`}>
                                                { stat.desc }
                                            </span>
                                            
                                            <h1 className='text-xl font-bold'>{ task.title }</h1>
                                        </div>
                                        <div className='col-span-3'>
                                            <p>{ task.details }</p>
                                        </div>
                                        <div className='text-gray-500 text-sm col-span-3 text-right'>
                                            Start Date: { new Date(task.start_date).toLocaleString('en-US', options) }
                                        </div>
                                        <div></div>
                                        <div></div>
                                        <div className='text-gray-500 text-sm col-span-3 text-right'>
                                            End Date: { new Date(task.end_date).toLocaleString('en-US', options) }
                                        </div>
                                        <div></div>
                                        <div className='text-right mt-3'>
                                            <button className='bg-green-700 w-full text-white rounded px-3 py-1 mx-2' onClick={ () => handleUpdateForm(task._id, task) }>Update</button> 
                                        </div>
                                        <div className='text-right mt-3'>
                                            <button className='bg-red-500 w-full text-white rounded px-3 py-1 mx-2' onClick={ () => handleDelete(task._id) }>Delete</button>
                                        </div>
                                        <div className='text-right col-span-3'>
                                            <span className='inline-block text-xs font-semibold px-2.5 py-0.5 rounded bg-red-100 text-red-800'>{ isDue ? 'Warning! Due Today' : ''}</span>
                                        </div>
                                    </div>
                                )
                            }) : 'No Tasks'
                    }
                </div>
            </div>
        </div>
    );

    return content;
}

export default Task

import { useState, useEffect } from 'react';
import { TodoistApi } from '@doist/todoist-api-typescript';
import { Link } from 'react-router-dom';

const api = new TodoistApi('17504752b9cc00463cd3fc16c545c684677935f5');

function HomePage() {
    const [tasks, setTasks] = useState<any>([]);
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    useEffect(() => {
        async function fetchTasks() {
            const response: any = await api.getTasks();
            setTasks(response);
            console.log(tasks)
        }

        fetchTasks();
    }, []);

    async function handleDeleteTask(taskId: any) {
        await api.deleteTask(taskId);
        setTasks(tasks.filter((task: any) => task.id !== taskId));
    }

    const addTitle = (e: string) => {
        setTitle(e)
    }

    const addDate = (e: string) => {
        setDate(e)
    }

    const addTask = () => {
        api.addTask({
            content: title,
            dueString: date,
        })
            .then((task) => console.log(task))
            .catch((error) => console.log(error))
    }

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Todo List</h1>
                    <a href="#my-modal-2"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        New Task
                    </a>
                    <div className="modal" id="my-modal-2">
                        <div className="modal-box flex flex-col gap-12">
                            <input onChange={(e) => addTitle(e.target.value)} type="text" placeholder='title task' />
                            <input onChange={(e) => addDate(e.target.value)} type="date" />
                            <div className="modal-action">
                                <a onClick={() => addTask()} href="#" className="btn">Add</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {tasks?.map((task: any) => (
                        <div
                            key={task.id}
                            className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-lg font-semibold mb-2">{task.content}</h2>
                                <div className="flex items-center justify-between text-gray-500 text-sm">
                                    <span>Priority : {task.priority}</span>
                                    <span>Due Date: {task?.due?.date}</span>
                                </div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <Link
                                    to={`/tasks/${task.id}`}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    Details
                                </Link>
                                <button
                                    onClick={() => handleDeleteTask(task.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div >
    );
}

export default HomePage;

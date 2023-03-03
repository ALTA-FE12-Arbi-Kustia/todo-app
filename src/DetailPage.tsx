import { useState, useEffect } from 'react';
import { TodoistApi } from '@doist/todoist-api-typescript';
import { useParams, useNavigate } from 'react-router-dom';

const api = new TodoistApi('17504752b9cc00463cd3fc16c545c684677935f5');

function DetailPage() {
    const { id } = useParams<{ id: any }>();
    const Navigate = useNavigate();
    const [task, setTask] = useState<any>({});
    const [date, setDate] = useState('')

    useEffect(() => {
        async function fetchTask() {
            const response = await api.getTask(id);
            setTask(response);
        }

        fetchTask();
    }, [id]);

    const [newContent, setNewContent] = useState('')
    const changeContent = (e: any) => {
        setNewContent(e)
    }

    async function handleUpdateTask() {
        await api.updateTask(id, { content: newContent, dueString: date });
        Navigate('/')
    }

    const goBack = () => [
        Navigate('/')
    ]

    const newDate = (e: any) => {
        setDate(e)
    }

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Task Details</h1>
                    <button
                        onClick={() => goBack()}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Back
                    </button>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <div onClick={handleUpdateTask}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
                                Content
                            </label>
                            <input
                                onChange={(e) => changeContent(e.target.value)}
                                type="text"
                                id="content"
                                name="content"
                                defaultValue={task.content}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="due_date">
                                Due Date
                            </label>
                            <input
                                onChange={(e) => newDate(e.target.value)}
                                type="date"
                                id="due_date"
                                name="due_date"
                                defaultValue={task.due?.date}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="priority">
                                Priority
                            </label>
                            <select
                                id="priority"
                                name="priority"
                                defaultValue={task.priority}
                                className="shadow appearance-none border rounded w-24 py-2 px-3 text-gray-700 leading-tight focus: ">
                            </select>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;
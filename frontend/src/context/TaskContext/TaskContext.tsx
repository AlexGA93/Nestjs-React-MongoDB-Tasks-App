import { createContext, useEffect, useState } from 'react';
import { createTaskRequest, deleteTaskRequest, getTasksRequest, updateTaskRequest } from '../../api/tasks';
import { CreateTaskType, TaskType, UpdateTask } from '../../types/types';

interface TaskContextValue {
    tasks: TaskType[];
    createTask: (task: CreateTaskType) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
    updateTask: (taskId: string, task: UpdateTask) => Promise<void>;
}

// "initial state"
export const TaskContext = createContext<TaskContextValue>({
    tasks: [],
    createTask: async () => {throw new Error("createTask() not implemented");},
    deleteTask: async () => {throw new Error("deleteTask() not implemented");},
    updateTask: async () => {throw new Error("updateTask() not implemented");},
});

interface Props {
    children: React.ReactNode
}

// Provider
export const TaskProvider: React.FC<Props> = ({ children }) => {

    const [tasks, setTasks] = useState<TaskType[]>([]);

    // Create Task Function
    const createTask = async (task: CreateTaskType) => {
        console.log('CREATE TASK REQUEST');
        // make asynchronous HTTP  request
        const res = await createTaskRequest(task);
        const data = await res.json();
        // update context with response data
        setTasks([...tasks, data]);
    };

    // Delete Task Function
    const deleteTask = async (taskId: string) => {
        console.log('DELETE TASK REQUEST');
        const response = await deleteTaskRequest(taskId);
        // if array is not in the backend delete it from the array
        if (response.status === 204) {
            setTasks(tasks.filter((task: TaskType) => task._id!==taskId));
        }
        
    };

    // Update Task Function
    const updateTask = async (id: string, task: UpdateTask) => {
        console.log(task);
        
        const response = await updateTaskRequest(id, task);
        const data = await response.json();
        console.log(data)
        setTasks(
          tasks.map((task) => (task._id === id ? { ...task, ...data } : task))
        );
      };

    useEffect(() => {
        getTasksRequest()
        .then((response) => response.json())
        .then((data) => setTasks(data) )
      },[]);

    return(
        <TaskContext.Provider value={{tasks, createTask, deleteTask, updateTask}}>
            { children }
        </TaskContext.Provider>
    )
};
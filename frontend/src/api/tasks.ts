import { CreateTaskType, UpdateTask } from "../types/types";

const baseUrl: string = "http://localhost:3000/api";

export const getTasksRequest = async () => fetch(`${baseUrl}/tasks`);

export const createTaskRequest = async (task: CreateTaskType) => 
  fetch(`${baseUrl}/tasks`, {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
  });


export const deleteTaskRequest = async (taskId: string) =>
  fetch(`${baseUrl}/tasks/${taskId}`, { method: "DELETE" });

export const updateTaskRequest = async (id: string, task: UpdateTask) =>
  fetch(`${baseUrl}/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
    },
  });

  export const getTaskRequest = async (taskId: string) => fetch(`${baseUrl}/tasks/${taskId}`);
export interface DefaultTaskFormType {
    title: string;
    description: string;
    done: boolean;
}

export interface TaskType {
    _id: string;
    title: string;
    description?: string;
    done?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

type CreateTaskType = Omit<TaskType, '_id' | 'createdAt' | 'updatedAt'>

export type UpdateTask = Partial<CreateTask>;
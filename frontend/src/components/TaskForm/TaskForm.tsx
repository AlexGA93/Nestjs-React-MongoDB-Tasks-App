import { ChangeEvent, useState } from "react";
import { useTasks } from "../../context";
import { CreateTaskType, DefaultTaskFormType } from "../../types/types";

const TaskForm = () => {
  const defaultFormState: DefaultTaskFormType = {
    title: "",
    description: "",
    done: false,
  };

  const [task, setTask] = useState<CreateTaskType>(defaultFormState);

  // calling context method crateTask
  const { createTask } = useTasks();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ): void => setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTask(task);  
  };

  return (
    <section className="text-center">
      <form onSubmit={handleSubmit}>
        <fieldset className="title">
          <label
            id="title-label"
            className="title-label inline-flex items-center gap-x-2"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="title-input border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
            placeholder="Write a title..."
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="desc">
          <label
            id="description-label"
            className="description-label inline-flex items-center gap-x-2"
            htmlFor="description"
          >
            Description:
          </label>
          <textarea
            name="description"
            rows={3}
            id="description"
            className="description-input border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
            onChange={handleChange}
          />
        </fieldset>
        <fieldset className="done">
          <label
            htmlFor="done"
            className=" inline-flex items-center gap-x-2 mx-2"
          >
            Done
          </label>
          <input
            type="checkbox"
            name="done"
            id="done"
            className="done h-5 w-5 text-indigo-600"
            onChange={() => setTask({...task, done: !task.done})}
          />
        </fieldset>
        <button
          id="button"
          type="submit"
          className="bg-indigo-600 shadow-xl hover:bg-indigo-500 text-white font-bold rounded-full p-2 my-2 w-40"
        >
          Submit
        </button>
      </form>
    </section>
  );
};
export default TaskForm;

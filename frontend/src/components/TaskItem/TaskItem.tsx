import { useTasks } from "../../context";
import { TaskType } from "../../types/types";
import { MdOutlineDoneAll, MdOutlineRemoveDone } from "react-icons/md";

const TaskItem = ({ task }: { task: TaskType }) => {
  const { deleteTask, updateTask } = useTasks();

  return (
    <div
      key={task._id}
      className="bg-gray-900 p-2 my-2 flex justify-between hover:bg-gray-800 hover: cursor-pointer"
    >
      <div>
        <h1>{task.title}</h1>
        <p>{task.description}</p>
        {task.done ? <MdOutlineRemoveDone />  : <MdOutlineDoneAll />}
      </div>
      <div className="flex gap-x-2 justify-center items-center">
        <button 
          className="bg-green-500 hover:bg-green-600 font-bold py-2 px-4 rounded mx-2 h-min"
          onClick={() => {
            updateTask(task._id, { done: !task.done })
          }}
          >
          Update
        </button>
        <button
          className=" bg-red-500 hover:bg-red-600 font-bold py-2 px-4 rounded mx-2 h-min"
          onClick={async () => {
            if(!window.confirm('Are you sure you want to delete this task?')) return;
            await deleteTask(task._id)
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
export default TaskItem;

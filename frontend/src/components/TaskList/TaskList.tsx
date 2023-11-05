import { TaskItem } from "..";
import { useTasks } from "../../context";
import { TaskType } from "../../types/types";

const TaskList = () => {
  const { tasks } = useTasks();

  return (
    <section>
      {tasks.map((task: TaskType) => <TaskItem key={task._id} task={task} />)}
    </section>
  );
};
export default TaskList;

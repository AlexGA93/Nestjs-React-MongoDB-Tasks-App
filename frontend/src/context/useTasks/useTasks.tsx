import { useContext } from "react"
import { TaskContext } from "..";

export const useTasks = () => {
  const taskContext = useContext(TaskContext);
  if (!taskContext) throw new Error('useTasks must be used within a TaskProvider');
  return taskContext;
}
export default useTasks
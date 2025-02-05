import { useState } from "react";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueTime?: string;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Complete project presentation", completed: false, dueTime: "2:00 PM" },
    { id: "2", title: "Review team updates", completed: false, dueTime: "4:30 PM" },
    { id: "3", title: "Schedule weekly meeting", completed: true },
  ]);

  const [newTask, setNewTask] = useState("");

  const handleComplete = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDelete = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
    };
    
    setTasks([task, ...tasks]);
    setNewTask("");
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAddTask} className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>
      
      <div className="space-y-2">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            title={task.title}
            completed={task.completed}
            dueTime={task.dueTime}
            onComplete={() => handleComplete(task.id)}
            onDelete={() => handleDelete(task.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
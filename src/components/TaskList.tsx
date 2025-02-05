import { useState } from "react";
import { format, addDays, subDays } from "date-fns";
import TaskCard from "./TaskCard";
import { Plus, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

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

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
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

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    setSelectedDate(current => 
      direction === 'prev' ? subDays(current, 1) : addDays(current, 1)
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateDate('prev')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="min-w-[240px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(selectedDate, "MMMM d, yyyy")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigateDate('next')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

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
import { Check, Clock, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  title: string;
  completed: boolean;
  dueTime?: string;
  onComplete: () => void;
  onDelete: () => void;
}

const TaskCard = ({ title, completed, dueTime, onComplete, onDelete }: TaskCardProps) => {
  return (
    <div className={cn(
      "group p-4 bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-200",
      "hover:shadow-md hover:border-primary/20",
      completed && "bg-gray-50"
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onComplete}
            className={cn(
              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
              completed ? "bg-success border-success" : "border-gray-300 hover:border-primary"
            )}
          >
            {completed && <Check className="w-4 h-4 text-white" />}
          </button>
          <span className={cn(
            "text-slate-700 transition-colors",
            completed && "text-slate-400 line-through"
          )}>
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {dueTime && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{dueTime}</span>
            </div>
          )}
          <button
            onClick={onDelete}
            className="p-1 text-gray-400 hover:text-destructive rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
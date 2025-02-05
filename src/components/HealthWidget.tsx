import { Activity, Heart, Moon } from "lucide-react";

const HealthWidget = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[
        { icon: Heart, label: "Heart Rate", value: "72 BPM", color: "text-rose-500" },
        { icon: Activity, label: "Steps", value: "8,432", color: "text-emerald-500" },
        { icon: Moon, label: "Sleep", value: "7h 23m", color: "text-indigo-500" },
      ].map(({ icon: Icon, label, value, color }) => (
        <div key={label} className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <div className="flex flex-col items-center text-center">
            <Icon className={`w-6 h-6 ${color} mb-2`} />
            <span className="text-sm text-gray-500">{label}</span>
            <span className="text-lg font-semibold text-gray-700">{value}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HealthWidget;
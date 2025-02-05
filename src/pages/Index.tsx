import TaskList from "@/components/TaskList";
import HealthWidget from "@/components/HealthWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
            <p className="text-gray-600">Here's your daily overview</p>
          </div>

          <HealthWidget />
          
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Tasks</h2>
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
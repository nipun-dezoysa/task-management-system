import { Button, Card, Chip } from "@heroui/react";
import {
  FiPlus,
  FiCheckCircle,
  FiTrendingUp,
  FiBell,
  FiSun,
  FiCalendar,
} from "react-icons/fi";

export default function HomePage() {
  const features = [
    {
      icon: <FiCheckCircle className="w-5 h-5" />,
      title: "Simple Task Tracking",
      description: "Easily add, complete, and organize your daily tasks",
    },
    {
      icon: <FiTrendingUp className="w-5 h-5" />,
      title: "Productivity Insights",
      description: "Visualize your progress with clean charts and stats",
    },
    {
      icon: <FiBell className="w-5 h-5" />,
      title: "Smart Reminders",
      description: "Never miss important deadlines with timely alerts",
    },
  ];

  const recentTasks = [
    { id: 1, name: "Morning workout", completed: true },
    { id: 2, name: "Read 30 pages", completed: true },
    { id: 3, name: "Finish project draft", completed: false },
    { id: 4, name: "Grocery shopping", completed: false },
  ];

  return (
    <div className="font-poppins min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="container mx-auto px-6 flex flex-col items-center text-center">
          <Chip
            color="primary"
            variant="flat"
            startContent={<FiSun className="w-4 h-4" />}
            className="mb-4"
          >
            Personal Productivity
          </Chip>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 max-w-3xl">
            Organize Your Life,{" "}
            <span className="text-blue-600">One Task at a Time</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl">
            A minimalist task manager designed to help you focus on what truly
            matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              color="primary"
              size="lg"
              endContent={<FiPlus className="ml-1" />}
            >
              Add First Task
            </Button>
            <Button variant="bordered" size="lg">
              Take a Tour
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Task Preview */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="border rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Today's Tasks</h2>
              <Chip color="primary" variant="dot">
                4 tasks
              </Chip>
            </div>

            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center p-3 hover:bg-gray-50 rounded-lg"
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 ${
                      task.completed
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {task.completed && (
                      <FiCheckCircle className="w-3 h-3 m-0.5" />
                    )}
                  </div>
                  <span
                    className={`flex-grow ${
                      task.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {task.name}
                  </span>
                  <FiCalendar className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Productivity Companion
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Designed for simplicity and focus, with just the features you
              need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-md transition-shadow border"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to organize your life?
            </h2>
            <p className="text-gray-600 mb-8">
              Sign up now and start your journey to better productivity.
            </p>
            <div className="flex justify-center gap-4">
              <Button
                color="primary"
                size="lg"
                endContent={<FiPlus className="ml-1" />}
              >
                Get Started
              </Button>
              <Button variant="bordered" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Card } from "../../components";
import Navbar from "../../components/NavBar/NavBar";
import NewTask from "../../components/NewTask/NewTask";
import { Task } from "../../types/Task";
import { AnimatePresence, motion } from "framer-motion";

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleDelete = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }

  const handleNewTask = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleFavoriteToggle = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  }


  useEffect(() => {
    console.log('Url usada: ', process.env.REACT_APP_API_URL);

    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        setTasks(data.data);
      }
    };
    fetchData();
  }, []);

  const filteredTasks = tasks.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const favoriteTasks = filteredTasks.filter(task => task.is_favorite);
  const otherTasks = filteredTasks.filter(task => !task.is_favorite);


  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="flex my-15 justify-center items-center">
        <NewTask onTaskCreated={handleNewTask} />
      </div>
      <div className="px-25 mb-4">
        <h1 className="px-6 font-inter text-[#363636]">Favoritas</h1>
      </div>
      {favoriteTasks.length === 0 && <div className="flex underline justify-center items-center">Nenhuma tarefa favorita</div>}
      <div className="w-full grid grid-cols-1 gap-5 lg:px-15 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
        <AnimatePresence>
          {favoriteTasks.map((task) => (
            <motion.div
              key={task.id}
              layout                         
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Card key={task.id} task={task} onFavoriteToggle={handleFavoriteToggle} onDelete={handleDelete} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="px-25 mt-12 mb-4">
        <h1 className="px-6 font-inter text-[#363636]">Outras</h1>
      </div>
      {otherTasks.length === 0 && <div className="flex underline justify-center items-center">Nenhuma outra tarefa</div>}
      <div className="w-full mb-15 grid grid-cols-1 gap-5 lg:px-15 md:grid-cols-2 lg:grid-cols-3 justify-center items-center">
        <AnimatePresence>
          {otherTasks.map((task) => (
            <motion.div
              key={task.id}
              layout                         
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Card key={task.id} task={task} onFavoriteToggle={handleFavoriteToggle} onDelete={handleDelete} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default TasksPage;

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import taskService from "../services/taskService";
import TaskCard from "../components/TaskCard";
import AddTaskForm from "../components/AddTaskForm";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { toast } from "react-toastify";
import useInactivityLogout from "../hooks/useInactivityLogout";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [newTask,setNewTask]= useState("");
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError]= useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);


    const { user, logout } = useAuth();

    const fetchTasks = async () => {
      setIsLoading(true)
        setError(null);

      try {
       const data = await taskService.getTasks();

        setTasks(data);
      } catch (error) {
        setError(error);
      } finally {
          setIsLoading(false)
      }
    };
    const navigate = useNavigate();

    const handleInactivityLogout = useCallback(() => {
      logout();

      localStorage.setItem("sessionExpired", "true");

      navigate("/login");
  }, [logout, navigate]);

  useInactivityLogout(handleInactivityLogout);


    const handleLogout = () => {
      logout();

      toast.success("Logged out successfully!");

      navigate("/login");
    };

    const handleCreateTask = async (e) => {
      e.preventDefault();

      if(!newTask.trim()) return;

        try {
            const createdTask = await taskService.createTask({
                title: newTask,
            });
            setTasks([...tasks, createdTask]);
            setNewTask("");

            toast.success("Task created!");

            } catch (error) {
                console.log(error);
            }
        }
        const handleToggleComplete = async (task) => {
          try {
            const updatedTask = await taskService.updateTask(task._id, {
              completed: !task.completed,
            });

            setTasks(
              tasks.map((t) =>
                t._id === task._id ? updatedTask : t
              )
            );
          } catch (error) {
            console.log(error);
          }
        };

        const handleUpdateTask = async (taskId, editedTitle) => {

          try {
            const updatedTask = await taskService.updateTask(taskId, {
              title: editedTitle,
            });

            setTasks(
              tasks.map((task) =>
                task._id === taskId ? updatedTask : task
              )
            );

            toast.success("Task updated!");

          } catch (error) {
            console.log(error);
          }
        };

        const handleDeleteTask = async (taskId) => {
          try {
            await taskService.deleteTask(taskId);

            setTasks(tasks.filter((task) => task._id !== taskId));

            toast.success("Task deleted!");

          } catch (error) {
            console.log(error);
          }
        };

        const openDeleteModal = (taskId) => {
          setTaskToDelete(taskId);
          setShowDeleteModal(true);
        };

        const confirmDelete = async () => {
          await handleDeleteTask(taskToDelete);

          setShowDeleteModal(false);
          setTaskToDelete(null);
        };



        useEffect(() => { fetchTasks()
        }, []);

      console.log(tasks);

      return (
        <div className="min-h-screen bg-slate-100">
         <div className="max-w-4xl mx-auto p-4 md:p-8">

         <div className="flex flex-col md:flex-row justify-between items-end gap-4" >
          <div>
         <p className="text-slate-500 text-lg">
            Welcome back, {user.name} 👋
          </p>
          <h1 className="text-4xl font-bold text-slate-800" >
            Task Manager
          </h1>

          <button onClick={handleLogout}
          className ="
          bg-red-500
          text-white
          px-4
          py-2
          mb-3
          rounded-lg
          hover:bg-red-600
          transition
          cursor-pointer
        " >
          Logout
          </button>
          </div>

        </div>

        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Add a New Task
          </h2>

          <AddTaskForm
             newTask  = {newTask}
             onInputChange= {setNewTask}
             onCreateTask = {handleCreateTask}
          />
        </div>

         <h2 className="text-xl font-semibold mb-4">
                My Tasks
          </h2>
        {
  error ? (
    <>
      <p className="text-left mt-6 text-slate-600 font-semibold" >
        ❌ Unable to load your tasks...
        </p>

      <p className="text-left mt-1 text-slate-600 font-semibold">
        Please check your internet connection and try again.

      </p>

      <button  className="text-blue-600 font-medium cursor-pointer"
       onClick={fetchTasks}>
        Retry
      </button>
    </>
  ) : isLoading ? (
    <p>Loading...</p>
  ) : tasks.length === 0 ? (
    <p>🎉 You're all caught up!

    Create your first task to get started.</p>
  ) : (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={openDeleteModal}
          onComplete={handleToggleComplete}
          onUpdate={handleUpdateTask}
        />
      ))}
    </div>
  )
}


         </div>

         <ConfirmDeleteModal
                show={showDeleteModal}
                onCancel={() => {
                  setShowDeleteModal(false);
                  setTaskToDelete(null);
                }}
                onConfirm={confirmDelete}
              />
      </div>


      );


}

export default Dashboard;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import taskService from "../services/taskService";
import TaskCard from "../components/TaskCard";
import AddTaskForm from "../components/AddTaskForm";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [newTask,setNewTask]= useState("");
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError]= useState(null)
   
   
    const fetchTasks = async () => {
      try {
        const data = await taskService.getTasks();
        setIsLoading(true)
        setError(null),
        
        setTasks(data);
      } catch (error) {
        setError(error);
      } finally {
          setIsLoading(false)
      }
    };
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
      };

    const handleCreateTask = async () => {
        if(!newTask.trim()) return;
        
        try {
            const createdTask = await taskService.createTask({
                title: newTask,
            });
            setTasks([...tasks, createdTask]);
            setNewTask("");
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
          } catch (error) {
            console.log(error);
          }
        };

        const handleDeleteTask = async (taskId) => {
          try {
            await taskService.deleteTask(taskId);
        
            setTasks(tasks.filter((task) => task._id !== taskId));
          } catch (error) {
            console.log(error);
          }
        };
      
        useEffect(() => { fetchTasks()
        }, []);
   
      console.log(tasks);

      return (
        <div>
          <h1>Dashboard</h1>
         

          <button onClick={handleLogout}>
          Logout
          </button>

          <AddTaskForm  
             newTask  = {newTask}
             onInputChange= {setNewTask}
             onCreateTask = {handleCreateTask}
          />
      
      {
        error ?
        (
 <>
   <p>❌ Unable to load your tasks</p>

    <p> Please check your internet connection and try again
      <button onClick= {fetchTasks}>
          Retry
      </button>
   </p> 
 </>
        ):
       ( isLoading ?
       (
        <p>Loading...</p>
        ): (
        tasks.length === 0 ? 
        (<p>You don't have any tasks yet.

         Create your first task!</p>)
        :
          (tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDeleteTask}
              onComplete={handleToggleComplete}
              onUpdate ={handleUpdateTask}
            />
  
)))))
          }
         
             

      
        </div>

        
      );

      
}

export default Dashboard;
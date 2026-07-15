import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

const getTasks = async () => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const createTask = async (taskData) => {
    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, taskData, config);
    return response.data
};

const updateTask = async (taskId, taskData) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/${taskId}`,
    taskData,
    config
  );

  return response.data;
};

const deleteTask = async(taskId) => {
    const token = localStorage.getItem("token");

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(`${API_URL}/${taskId}`, config);
    return response.data;
}

const taskService = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

export default taskService;
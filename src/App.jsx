import React, { useState, useEffect } from "react";

import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";
import { addMoodAPI, getMoodsAPI, updateMoodAPI } from "./services/apiService";
const oldTasks = localStorage.getItem("tasks");

const App = () => {
  const [loading, setLoading] = useState(true);
  const [activeCard, setActiveCard] = useState(null);
  const [token, setToken] = useState([]);
  const onDrop = async (status, position) => {
    console.log(
      `${activeCard} is going to ${status} and in position ${position}`
    );

    if (activeCard == null || activeCard === undefined) return;

    // Get the task to move
    const taskToMove = token[activeCard];
    // Remove the task from its current position
    const updatedTasks = token.filter((task, index) => index !== activeCard);
    // Insert the task into its new position
    updatedTasks.splice(position, 0, {
      ...taskToMove,
      status: status,
    });

    // Update the state locally
    setToken(updatedTasks);

    try {
      // Send the update to the backend
      await updateMoodAPI(taskToMove.id, status);
      // Optionally handle success (e.g., show a notification)
    } catch (error) {
      console.error('Error updating task on the server:', error);
      // Rollback the local state if the update fails
      fetchTasks(); // Re-fetch tasks from the server
    }
  };
  const fetchTasks = async () => {
    try {
      const newTasks = await getMoodsAPI();
      setToken(newTasks); // Update state with the new data

      console.log("Fetched tasks:", newTasks); // Logs the fetched data correctly
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  };
  useEffect(() => {

    fetchTasks(); // Call the function to fetch tasks
  }, []); 

  
  

 

  

  if (loading) {
    return <p>LOADING!</p>;
  }
  return (
    <div className="app">
      { loading === false && (
        <div>
          <TaskForm setTasks={setToken} tasks={token} />
          <main className="app_main">
            <TaskColumn
              title="To do"
              icon={todoIcon}
              tasks={token}
              status="todo"
              setActiveCard={setActiveCard}
              onDrop={onDrop}
              setTasks={setToken}
              />
            <TaskColumn
              title="Doing"
              icon={doingIcon}
              tasks={token}
              status="doing"
              setActiveCard={setActiveCard}
              onDrop={onDrop}
              setTasks={setToken}
              />
            <TaskColumn
              title="Done"
              icon={doneIcon}
              tasks={token}
              status="done"
              setActiveCard={setActiveCard}
              setTasks={setToken}
              onDrop={onDrop}
            />
          </main>
         
        </div>
      )}
    </div>
  );
};

export default App;

import { useEffect, useState } from "react";

import { Box, Flex, Spinner, Text } from "@radix-ui/themes";
import "./App.css";
import TaskColumn from "./components/TaskColumn";
import TaskForm from "./components/TaskForm";
import { getMoodsAPI, updateMoodAPI } from "./services/apiService";



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
      console.error("Error updating task on the server:", error);
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

    return (


      <Box
        style={{
          display: "grid",
          placeItems: "center",
        }}
        width={"100%"}
        height={"100vh"}
      >

        <head>
          <title>Kanban-Board</title>
        </head>
        <Flex align={"center"} gap={"2"}>
          <Spinner />
          <Text>
            Loading{" "}
            <Text weight={"medium"} color="purple">
              Tasks...
            </Text>
          </Text>
        </Flex>
      </Box>
    );
  }



  return (
    <div className="app">
      {loading === false && (
        <Box py={"6"}>
          <TaskForm setTasks={setToken} tasks={token} />
          <main className="app_main">
            <TaskColumn
              title="To do"
              icon={<ListIcon />}
              tasks={token}
              status="todo"
              setActiveCard={setActiveCard}
              onDrop={onDrop}
              setTasks={setToken}
            />
            <TaskColumn
              title="Doing"
              icon={<Progress />}
              tasks={token}
              status="doing"
              setActiveCard={setActiveCard}
              onDrop={onDrop}
              setTasks={setToken}
            />
            <TaskColumn
              title="Done"
              icon={<Done />}
              tasks={token}
              status="done"
              setActiveCard={setActiveCard}
              setTasks={setToken}
              onDrop={onDrop}
            />
          </main>
        </Box>
      )}
    </div>
  );
};

function ListIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="6" height="6" rx="1" />
      <path d="m3 17 2 2 4-4" />
      <path d="M13 6h8" />
      <path d="M13 12h8" />
      <path d="M13 18h8" />
    </svg>
  );
}

function Done() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 7 17l-5-5" />
      <path d="m22 10-7.5 7.5L13 16" />
    </svg>
  );
}

function Progress() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.1 2.182a10 10 0 0 1 3.8 0" />
      <path d="M13.9 21.818a10 10 0 0 1-3.8 0" />
      <path d="M17.609 3.721a10 10 0 0 1 2.69 2.7" />
      <path d="M2.182 13.9a10 10 0 0 1 0-3.8" />
      <path d="M20.279 17.609a10 10 0 0 1-2.7 2.69" />
      <path d="M21.818 10.1a10 10 0 0 1 0 3.8" />
      <path d="M3.721 6.391a10 10 0 0 1 2.7-2.69" />
      <path d="M6.391 20.279a10 10 0 0 1-2.69-2.7" />
    </svg>
  );
}

export default App;

/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import "./TaskForm.css";
import Tag from "./Tag";
import { addMoodAPI } from "../services/apiService";
import {
  Badge,
  Flex,
  Text,
  Button,
  Select,
  Box,
  TextField,
} from "@radix-ui/themes";
import { PlusIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
// import { getUsers, insertTable } from "../../kanban-server/statement";

const TaskForm = ({ setTasks, tasks }) => {
  const [value, setValue] = useState("");
  const [taskData, setTaskData] = useState({
    task: "",
    status: "todo",
    tags: [],
  });

  const checkTag = (tag) => {
    return taskData.tags.some((item) => item === tag);
  };

  const selectTag = (tag) => {
    if (taskData.tags.some((item) => item === tag)) {
      const filterTags = taskData.tags.filter((item) => item !== tag);
      setTaskData((prev) => {
        return { ...prev, tags: filterTags };
      });
    } else {
      setTaskData((prev) => {
        return { ...prev, tags: [...prev.tags, tag] };
      });
    }
  };
  // console.log(tasks )

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks((prev) => {
      return [...prev, taskData];
    });
    console.log(taskData);
    setTaskData({
      task: "",
      status: "todo",
      tags: [],
    });
    // console.log(tasks);
    const jsonTags = JSON.stringify(taskData.tags);
    addMoodAPI(taskData.status, jsonTags, taskData.task);
    // insertTable(taskData.task)
    // getUsers()
  };

  //TODO; fix the input state issue
  const inputValue = taskData.task;

  return (
    <header className="app_header">
      <form onSubmit={handleSubmit}>
        <Box pb={"4"}>
          <TextField.Root
            name="task"
            value={taskData.task}
            onChange={handleChange}
            placeholder="Enter your task..."
          ></TextField.Root>
        </Box>

        <div className="task_form_bottom_line">
          <Flex gap="2" margin="5">
            <Badge
              style={{
                cursor: "pointer",
              }}
              color="plum"
              variant={checkTag("HTML") ? "soft" : "surface"}
              onClick={() => selectTag("HTML")}
              highContrast={checkTag("HTML")}
            >
              HTML
            </Badge>
            <Badge
              style={{
                cursor: "pointer",
              }}
              variant={checkTag("CSS") ? "soft" : "surface"}
              onClick={() => selectTag("CSS")}
              highContrast={checkTag("CSS")}
              color="orange"
            >
              CSS
            </Badge>
            <Badge
              style={{
                cursor: "pointer",
              }}
              variant={checkTag("Javascript") ? "soft" : "surface"}
              onClick={() => selectTag("Javascript")}
              highContrast={checkTag("Javascript")}
              color="cyan"
            >
              Javascript
            </Badge>
            <Badge
              style={{
                cursor: "pointer",
              }}
              variant={checkTag("React") ? "soft" : "surface"}
              onClick={() => selectTag("React")}
              highContrast={checkTag("React")}
              color="iris"
            >
              React
            </Badge>
          </Flex>

          <Flex gap="2" align={"center"}>
            <Select.Root
              value={taskData.status}
              name="status"
              onValueChange={(value) =>
                setTaskData((prev) => ({ ...prev, status: value }))
              }
              
              className="cursor-pointer"
            >
              <Select.Trigger  style={{ cursor: 'pointer' }} />
              <Select.Content>
                <Select.Group>
                  <Select.Item value="todo">To do</Select.Item>
                  <Select.Item value="doing">Doing</Select.Item>
                  <Select.Item value="done">Done</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>

            <Button  style={{ cursor: 'pointer' }} type="submit">
              <PlusIcon />
              Add Task
            </Button>
          </Flex>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;

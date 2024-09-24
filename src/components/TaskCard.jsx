/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import "./TaskCard.css";
import Tag from "./Tag";
import deleteIcon from "../assets/delete.png";
import { deleteMoodAPI } from "../services/apiService";
import { Box, Card, Flex, Avatar, Text, Badge } from "@radix-ui/themes";
import { Cross1Icon } from "@radix-ui/react-icons";

const TaskCard = ({
  title,
  tags,
  index,
  id,
  setActiveCard,
  setTasks,
  tasks,
}) => {
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteMoodAPI(taskId);
      // Update the state to remove the deleted task
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      // Optionally, show an error message to the user
    }
  };

  function getTagColor(tag) {
    switch (tag) {
      case "HTML":
        return "plum";
      case "CSS":
        return "orange";
      case "Javascript":
        return "cyan";
      case "React":
        return "iris";
      default:
        return "orange";
    }
  }

  return (
    <Box
      as="div"
      draggable
      onDragStart={() => setActiveCard(index)}
      maxWidth="400px"
      position={"relative"}
    >
      <Card variant="classic">
        <Flex gap="3" align="center">
          <Flex direction={"column"} gapY={"2"}>
            <Text
              as="div"
              size="4"
              weight="medium"
              style={{ textTransform: "capitalize" }}
            >
              {title}
            </Text>
            <Flex gap={"1"} size="2" color="gray">
              <Flex gap="2">
                {tags.map((tag, index) => (
                  <Badge color={getTagColor(tag)} key={tag}>
                    {tag}
                  </Badge>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Box
          onClick={() => handleDeleteTask(id)}
          as="span"
          style={{
            backgroundColor: "hsl(0 0 90%)",
            position: "absolute",
            top: 6,
            right: 8,
            borderRadius: "50%",
            height: 14,
            width: 14,
            display: "grid",
            placeItems: "center",
            cursor: "pointer"
          }}
        >
          <Cross1Icon height={7} width={7} />
        </Box>
      </Card>
    </Box>
  );
};

export default TaskCard;

/* eslint-disable react/prop-types */
import { Flex, Text } from "@radix-ui/themes";
import React from "react";

import DropArea from "./DropArea";
import TaskCard from "./TaskCard";
import "./TaskColumn.css";

const TaskColumn = ({
  title,
  icon,
  tasks,
  status,
  setActiveCard,
  setTasks,
  onDrop,
}) => {
  // console.log(tasks[0].tags)

  return (
    <section className="task_column">
      <Text weight={"medium"} color="iris">
        <Flex gap="2">
          {icon} {title}
        </Flex>
      </Text>

      <DropArea onDrop={() => onDrop(status, 0)} />
      {tasks.map(
        (task, index) =>
          task.status === status && (
            <React.Fragment key={index}>
              <TaskCard
                key={index}
                title={task.task}
                tags={task.tags}
                index={index}
                id={task.id}
                tasks={tasks}
                setTasks={setTasks}
                setActiveCard={setActiveCard}
              />
              <DropArea onDrop={() => onDrop(status, index + 1)} />

              {/* <p>{task.tags}</p>
                <p>{task.title}</p> */}
            </React.Fragment>
          )
      )}
    </section>
  );
};

export default TaskColumn;

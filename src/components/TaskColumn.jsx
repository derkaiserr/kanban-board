import React from "react";
import Todo from "../assets/direct-hit.png";

import "./TaskColumn.css";
import TaskCard from "./TaskCard";
import DropArea from "./DropArea";

const TaskColumn = ({
  title,
  icon,
  tasks,
  status,
  setActiveCard,
  setTasks,
  onDrop
}) => {

  // console.log(tasks[0].tags)
  
  return (
    <section className="task_column">
      <h2 className="task_column_heading">
        <img className="task_column_icon" src={icon} alt="" /> {title}
      </h2>



          <DropArea onDrop={()=>onDrop(status, 0)}/>
      {tasks.map(
        (task, index) =>
          task.status === status && (
            <React.Fragment
            
                key={index}
                >
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
              <DropArea onDrop={()=>onDrop(status, index + 1)}/>

                {/* <p>{task.tags}</p>
                <p>{task.title}</p> */}
            </React.Fragment>
          )
      )}
    </section>
  );
};

export default TaskColumn;

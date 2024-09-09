import React from "react";
import "./TaskCard.css";
import Tag from "./Tag";
import deleteIcon from "../assets/delete.png";
import { deleteMoodAPI } from "../services/apiService";

const TaskCard = ({ title, tags, index, id, setActiveCard, setTasks, tasks }) => {


    const handleDeleteTask = async (taskId) => {
        try {
          await deleteMoodAPI(taskId);
          // Update the state to remove the deleted task
          setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
          console.error('Error deleting task:', error);
          // Optionally, show an error message to the user
        }
      };


  return (
    <article
      className="task_card"
      draggable
      onDragStart={() => setActiveCard(index)}
      onDragEnd={() => setActiveCard(null)}
    >
      <p
      onClick={()=> console.log(id)}
       className="task_text">{title}</p>

      <div className="task_card_bottom_line">
        <div className="task_card_tags">
          {    tags.map((tag, index) => <Tag key={index} tagName={tag} selected />)
}
        </div>
        <div className="task_delete" onClick={()=>handleDeleteTask(id)}>
          <img src={deleteIcon} className="delete_icon" alt="" />
        </div>
      </div>
    </article>
  );
};

export default TaskCard;

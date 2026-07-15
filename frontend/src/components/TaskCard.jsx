import { useState } from "react";

function TaskCard({ task, onDelete, onComplete, onUpdate}) {
  
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);

    return (
      <div>
        {
          isEditing ? ( 
    <>
    <input
      value={editedTitle}
      onChange={(e) => setEditedTitle(e.target.value)}
    />
    <button onClick={() => {
        const trimmedTitle = editedTitle.trim();
          if (!trimmedTitle) return;
      
          onUpdate(task._id, editedTitle)
          setIsEditing(false)
    }}>
               Save
    </button>
    
    <button onClick={() => {
      setEditedTitle(task.title);
      setIsEditing(false)
    }}>
        Cancel
    </button>
    </>
  ) : (
    <>
    <p>
      {task.completed ? "✅" : "⬜"} {task.title}
    </p>

     <button onClick={()=> onComplete (task) }>
     Task Complete
 </button>
    
    <button onClick={()=> setIsEditing(true) }>
    Edit
   </button>


 <button onClick={()=> onDelete (task._id) }>
     Delete
 </button>
 </>
      )
  }
       
      </div>
  )
};

export default TaskCard;
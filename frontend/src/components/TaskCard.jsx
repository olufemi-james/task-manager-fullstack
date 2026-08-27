import { useState } from "react";

function TaskCard({ task, onDelete, onComplete, onUpdate}) {

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);

    const buttonStyle = "text-white px-4 py-2 rounded-lg transition cursor-pointer";
    return (
      <div className="bg-white rounded-xl shadow-md p-5 mb-6">
        {
          isEditing ? (
    <>
    <input className="flex-1 p-2 border rounded-lg mb-2 text-lg font-medium text-slate-800"

      value={editedTitle}
      onChange={(e) => setEditedTitle(e.target.value)}

    />
    <div className="flex gap-3">
    <button className= {`${buttonStyle} bg-green-500 hover:bg-green-600`}

    onClick={() => {
        const trimmedTitle = editedTitle.trim();
          if (!trimmedTitle) return;

          onUpdate(task._id, trimmedTitle)
          setIsEditing(false)
    }}>
               Save
    </button>

    <button  className= {`${buttonStyle} bg-gray-500 hover:bg-gray-600`}

    onClick={() => {
      setEditedTitle(task.title);
      setIsEditing(false)
    }}>
        Cancel
    </button>
    </div>
    </>
  ) : (
    <>
    <div  className = {
    task.completed
      ? "bg-gray-50 rounded-xl shadow-md p-5 mb-4"
      : "bg-white rounded-xl shadow-md p-5 mb-4"
  }>
    <p className={
    task.completed
    ? "text-lg font-medium text-slate-600 line-through opacity-70 mb-4"
    :
    "text-lg font-medium text-slate-800 mb-4"}>
       {task.title}
    </p>
    <div className="flex gap-3">
     <button onClick={()=> onComplete (task) }
      className={`${buttonStyle} ${
        task.completed
          ? "bg-yellow-500 hover:bg-yellow-600"
          : "bg-green-500 hover:bg-green-600"
      }`}>
     {task.completed ? "Undo" : "Complete"}
 </button>

    {!task.completed && (
    <button onClick={()=> setIsEditing(true) }
    className= {`${buttonStyle} bg-blue-500 hover:bg-blue-600`}>
    Edit
   </button>
   )}

 <button onClick={()=> onDelete (task._id) }
 className = {`${buttonStyle} bg-red-500 hover:bg-red-600`}>
     Delete
 </button>
 </div>
 </div>
 </>

      )
  }

      </div>
  )
};

export default TaskCard;
function AddTaskForm({ newTask, onInputChange, onCreateTask}) {
    return (
        <div>
            <input 
                type = "text"
                placehoder = "Enter Task title"
                value = {newTask}
                onChange={(e)=> onInputChange(e.target.value)} 
            />
            
            
            <button onClick = {onCreateTask} >
                Add Task
            </button>
        </div>
    )
}

export default AddTaskForm;
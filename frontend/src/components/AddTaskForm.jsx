function AddTaskForm({ newTask, onInputChange, onCreateTask}) {
    return (

           <form
            className="flex gap-4"
            onSubmit = {onCreateTask}
           >
            <input
                className="flex-1 p-3 border rounded-lg text-lg font-medium text-slate-800"
                type = "text"
                placeholder = "Enter Task title"
                value = {newTask}
                onChange={(e)=> onInputChange(e.target.value)}
            />


            <button  type ="submit"
            className="
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-lg
            hover:bg-blue-700
            transition
            cursor-pointer
            ">
                Add Task
            </button>
         </form>

    )
}

export default AddTaskForm;
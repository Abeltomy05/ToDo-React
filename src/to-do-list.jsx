import React,{useState} from "react";

function ToDoList(){
       
    const [tasks,setTasks] = useState([]);
    const [newTask,setNewTask] = useState("");
    const [editIndex,setEditIndex] = useState(null);
    const [completedTask,setCompletedTask] = useState([]);

    

    function handleInputChange(e){
        setNewTask(e.target.value);
    }

    function addTask(){
        
       if(newTask.trim() !== ""){
        const normalizedTask = newTask.toLowerCase();
        const taskExist = tasks.some(task=> task.toLowerCase() === normalizedTask)
        if(taskExist){
            alert("Task already exists!!")
        }else   {
            if(editIndex === null){
                setTasks(t=>[normalizedTask,...tasks])
            }else{
                const updatedTasks = [...tasks];
                updatedTasks[editIndex] = normalizedTask;
                setTasks(updatedTasks);
                setEditIndex(null);
            }
        }
        
       }
       setNewTask("");
    }
    function editTasks(index){
         setNewTask(tasks[index]);
         setEditIndex(index);
    }
    function deleteTask(index){
        
        const updatedTasks = tasks.filter((_,i)=>i != index);
         setTasks(updatedTasks);
    }
    function completeTasks(task){
         const updatedCompletedTask = [...completedTask];
         if(completedTask.includes(task)){
            updatedCompletedTask.splice(updatedCompletedTask.indexOf(task),1);
         }else{
            updatedCompletedTask.push(task);
         }
         setCompletedTask(updatedCompletedTask);
    }
    
    
    return(
        <>
         <div className="to-do-container">
            <h1>To-Do-List</h1>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="What should I do today?" value={newTask} onChange={handleInputChange}/>
                <button className="add-btn" onClick={addTask} disabled={!newTask.trim()}>{editIndex === null ? "Add" : "Save"}</button>
                <ol>
                  {tasks.map((task,i)=>
                     <li key={i}>
                     <span className="text" style={{textDecoration: completedTask.includes(task) ? "line-through" : "none"}}>{task}</span>
                     <button className="edit-btn" onClick={()=>editTasks(i)}  disabled={completedTask.includes(task)} style={{backgroundColor: completedTask.includes(task) ? "#d3d3d3" : "hsl(207, 90%, 64%)"}}>Edit</button>
                     <button className="complete-btn"  onClick={()=>completeTasks(task)}>{completedTask.includes(task) ? "Undo" : "Completed"}</button>
                     <button className="delete-btn" onClick={()=>deleteTask(i)}  disabled={completedTask.includes(task)} style={{backgroundColor: completedTask.includes(task) ? "#d3d3d3" : "hsl(10, 90%, 40%)"}}>Delete</button>
                     </li>
                   )}
                </ol>
            </div>
         </div>
        </>
       )
}
export default ToDoList;
import { useContext, useEffect, useState } from "react"
import { CurrentUserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { deleteTask, getTasks, postNewTask, updateTask } from "../utils/APIUtils";
import { NewTaskRequest, Task, UpdateTaskRequest } from "../model/Task";
import TaskItem from "../components/TaskItem";
import NewTaskForm from "../components/NewTaskForm";
import DeletePrompt from "../components/DeletePrompt";
import EditTaskForm from "../components/EditTaskForm";
import "../style/Home.css"
import "../style/Modal.css"
import { dateToString } from "../utils/DateUtils";

export default function Home() {
    const currentUser = useContext(CurrentUserContext);
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showNewTaskForm, setShowNewTaskForm] = useState<boolean>(false);
    const [showEditTaskForm, setShowEditTaskForm] = useState<boolean>(false);
    const [showDeletePrompt, setShowDeletePrompt] = useState<boolean>(false);
    const [taskToDelete, setTaskToDelete] = useState<Task>(tasks[0]);
    const [taskToEdit, setTaskToEdit] = useState<Task>(tasks[0]);

    useEffect(() => {
        if (!currentUser.authenticated) {
            navigate("login");
            return;
        }

        getTasks().then(response => {
            if (response.status == 200) {
                response.json().then(json => {
                    let fetchedTasks: Task[] = json;
                    console.log(fetchedTasks);
                    
                    setTasks(fetchedTasks);
                })
            }
        })
    }, [currentUser])

    function addNewTask(taskRequest: NewTaskRequest){
        postNewTask(taskRequest).then(response => {
            if(response.status === 201) {
                response.json().then(json => {
                    let newTask = json;
                    setTasks([...tasks, newTask]);
                })
            } else {
                alert("Something went wrong. Please try again later.");
            }
        })
        closeNewTaskForm();
    }

    function onComplete(task: Task){
        let updateRequest: UpdateTaskRequest = {
            taskId: task.taskId,
            name: task.name,
            description: task.description,
            dueDate: new Date(dateToString(task.dueDate).replace(/-/g, '\/')),
            complete: !task.complete
        };
        handleUpdateTask(updateRequest);
    }

    function handleUpdateTask(updateRequest: UpdateTaskRequest) {
        updateTask(updateRequest).then(response => {
            if(response.status === 201) {
                response.json().then(json => {
                    let updatedTask: Task = json;
                    console.log(updatedTask);
                    
                    const newTasks = tasks.map((task : Task) : Task =>  {return task.taskId === updatedTask.taskId ? updatedTask : task});
                    setTasks(newTasks);
                })
            } else {
                alert("Something went wrong! Please try again later.");
            }
        })
        closeEditTaskForm();
    }

    function onDelete(){
        deleteTask(taskToDelete.taskId).then(response => {
            if(response.status === 200) {
                let newTasks = tasks.filter(task => task.taskId !== taskToDelete.taskId);
                setTasks(newTasks);
            }
            closeDeletePrompt();
        })
    }

    function closeNewTaskForm() {
        setShowNewTaskForm(false);
    }

    function closeDeletePrompt() {
        setShowDeletePrompt(false);
    }

    function closeEditTaskForm(){
        setShowEditTaskForm(false);
    }

    return (
        <>
            <div className="task-page">
                {!showNewTaskForm && <button className="new-task-btn" onClick={() => setShowNewTaskForm(true)}>Add New Task</button>}
                {showNewTaskForm && <NewTaskForm createTask={addNewTask} closeForm={closeNewTaskForm}/>}
                {showEditTaskForm && <EditTaskForm handleUpdateTask={handleUpdateTask} task={taskToEdit} closeForm={closeEditTaskForm}/>}
                {showDeletePrompt && <DeletePrompt onDelete={onDelete} closeForm={closeDeletePrompt}/>}
                <div>{tasks.map(task => 
                    <div className="task-item" key={task.taskId} >
                        <TaskItem taskItemInfo={
                            {
                                task: task,
                                onComplete: () => {onComplete(task)}
                            }
                        }/>
                        <div className="task-btns">
                            <button className="edit-btn" onClick={() => {
                                setShowEditTaskForm(true);
                                setTaskToEdit(task);
                            }}>Edit</button>
                            <button className="delete-btn" onClick={() => {
                                setShowDeletePrompt(true);
                                setTaskToDelete(task)
                            }}>Delete</button>
                        </div>
                    </div>
                )}</div>
            </div>
        </>
    )
}
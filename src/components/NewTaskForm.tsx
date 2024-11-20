import { useState } from "react";
import { NewTaskRequest } from "../model/Task";
import { TASK_DESC_MAX_LENGTH, TASK_NAME_MAX_LENGTH } from "../constants/constants";
import { dateToString } from "../utils/DateUtils";

export default function NewTaskForm({ createTask, closeForm }: { createTask: (newTaskRequest: NewTaskRequest) => void, closeForm: () => void }) {
    const [taskName, setTaskName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [hasDueDate, setHasDueDate] = useState(false);
    const [dueDate, setDueDate] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("")

    function handleSubmit() {
        const newDueDate = hasDueDate ? new Date(dueDate.replace(/-/g, '\/')) : undefined;
        let newTaskRequest: NewTaskRequest = {
            name: taskName,
            description: taskDesc,
            dueDate: newDueDate
        }
        createTask(newTaskRequest);
    }

    return (
        <div className="modal">
            <form className="task-form" onSubmit={handleSubmit}>
                <input
                    className="name-input"
                    type="text"
                    name="name"
                    placeholder="Task's Name"
                    value={taskName}
                    onChange={(e) => { 
                        if (e.target.value.length < TASK_NAME_MAX_LENGTH) {
                             setTaskName(e.target.value);
                            } 
                        }}
                    required
                />
                <textarea
                    className="desc-input"
                    name="description"
                    placeholder="Describe the task"
                    value={taskDesc}
                    onChange={(e) => { 
                        if(e.target.value.length < TASK_DESC_MAX_LENGTH){
                            setTaskDesc(e.target.value);
                        }  
                    }}
                    required
                />
                <label
                    htmlFor="dueDateEnabled"
                    onClick={() => { setHasDueDate(!hasDueDate) }}>Add Due Date?</label>
                <input
                    type="checkbox"
                    name="dueDateEnabled"
                    checked={hasDueDate}
                    onChange={() => { setHasDueDate(!hasDueDate) }}
                />
                {hasDueDate &&
                    <input
                        type="date"
                        name="dueDate"
                        value={dueDate}
                        min={dateToString(new Date())}
                        onChange={(e) => { setDueDate(e.target.value) }}
                        required
                    />}
                <input className="submit-btn" type="submit"></input>
                <button onClick={closeForm}>Cancel</button>
            </form>
        </div>
    )
}
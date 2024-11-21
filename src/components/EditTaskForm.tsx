import { useState } from "react";
import { Task, UpdateTaskRequest } from "../model/Task";
import { dateToString } from "../utils/DateUtils";
import { TASK_DESC_MAX_LENGTH, TASK_NAME_MAX_LENGTH } from "../constants/constants";

export default function EditTaskForm({ handleUpdateTask, task, closeForm }: { handleUpdateTask(updateRequest: UpdateTaskRequest): void, task: Task, closeForm: () => void }) {
    const [taskName, setTaskName] = useState(task.name);
    const [taskDesc, setTaskDesc] = useState(task.description);
    const [hasDueDate, setHasDueDate] = useState<boolean>(task.dueDate !== null)
    const [dueDate, setDueDate] = useState<string>(dateToString(task.dueDate));

    function handleSubmit() {
        const newDueDate = hasDueDate ? new Date(dueDate.replace(/-/g, '\/')) : undefined;
        let updateRequest: UpdateTaskRequest = {
            taskId: task.taskId,
            name: taskName,
            description: taskDesc,
            dueDate: newDueDate,
            complete: task.complete
        }
        handleUpdateTask(updateRequest);
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
                        if (e.target.value.length <= TASK_NAME_MAX_LENGTH) {
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
                        if(e.target.value.length <= TASK_DESC_MAX_LENGTH){
                            setTaskDesc(e.target.value);
                        }  
                    }}
                    required
                />
                <div>
                    <label
                        htmlFor="dueDateEnabled"
                        onClick={() => { setHasDueDate(!hasDueDate) }}>Add Due Date?</label>
                    <input
                        type="checkbox"
                        name="dueDateEnabled"
                        checked={hasDueDate}
                        onChange={() => { setHasDueDate(!hasDueDate) }}
                    />
                </div>
                {hasDueDate &&
                    <input
                        type="date"
                        name="dueDate"
                        value={dueDate}
                        onChange={(e) => { setDueDate(e.target.value) }}
                        required
                    />}
                <input className="submit-btn" type="submit"></input>
                <button onClick={closeForm}>Cancel</button>
            </form>
        </div>
    )
}
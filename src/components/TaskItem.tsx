import { useState } from "react";
import { Task } from "../model/Task";
import { dateToString } from "../utils/DateUtils";

type TaskItemInfo = {
    task: Task,
    // onDeleteClick: () => void,
    // onEditClick: () => void,
    onComplete: () => void
}

export default function TaskItem({ taskItemInfo }: { taskItemInfo: TaskItemInfo }) {
    const task : Task = taskItemInfo.task;
    const [complete, setComplete] = useState<boolean>(task.complete);

    return (
        <div className="task">
            <div className="task-hdr">
                <h2 className="task-name">{task.name}</h2>
                {task.dueDate &&
                    <div className="due-date">
                        {task.dueDate ? "Due On: " + dateToString(task.dueDate) : ""}
                    </div>}
            </div>
            <div className="task-desc">{task.description}</div>

            <div className="task-complete"></div>
            <div className="task-ftr">
                <div className="creation-date">
                    Created On: {dateToString(task.creationDate)}
                </div>
                <button className={complete ? "complete-btn complete" : "complete-btn incomplete"} onMouseEnter={() => setComplete(!complete)} onMouseLeave={() => setComplete(task.complete)} onClick={taskItemInfo.onComplete}>
                    {complete ? "Completed!" : "Todo!"}
                </button>
            </div>
        </div>
    )
}
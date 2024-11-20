export default function DeletePrompt({ onDelete, closeForm }: { onDelete: () => void, closeForm: () => void }) {
    return (
        <div className="modal">
            <div className="delete-prompt modal-content">
                <div>Are you sure?</div>
                <div className="delete-btns">
                    <button onClick={onDelete}>Yes</button>
                    <button onClick={closeForm}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
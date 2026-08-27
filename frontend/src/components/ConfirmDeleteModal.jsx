function ConfirmDeleteModal({
    show,
    onCancel,
    onConfirm,
  }) {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
        <div className="bg-white rounded-xl shadow-xl p-6 w-96">

          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Delete Task
          </h2>

          <p className="text-slate-600 mb-6">
            Are you sure you want to delete this task?
            This action cannot be undone.
          </p>

          <div className="flex justify-end gap-3">

            <button
              onClick={onCancel}
              className="
                px-4
                py-2
                rounded-lg
                bg-gray-500
                text-white
                hover:bg-gray-600
                transition
                cursor-pointer
              "
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              className="
                px-4
                py-2
                rounded-lg
                bg-red-500
                text-white
                hover:bg-red-600
                transition
                cursor-pointer
              "
            >
              Delete
            </button>

          </div>

        </div>
      </div>
    );
  }

  export default ConfirmDeleteModal;
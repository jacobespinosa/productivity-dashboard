import WeeklyCalendar from "../components/WeeklyCalendar";

function CalendarPage({tasksByDate, taskActions}) {
    const {
        handleCreateTask,
        handleDeleteTask,
        handleToggleTask,
        handleUpdateTask,
        handleAddTask,
        handleEditTask
    } = taskActions;

    return (
        <WeeklyCalendar
            tasksByDate={tasksByDate}
            handleAddTask={handleAddTask}
            handleEditTask={handleEditTask}
            handleCreateTask={handleCreateTask}
            handleDeleteTask={handleDeleteTask}
            handleToggleTask={handleToggleTask}
            handleUpdateTask={handleUpdateTask}
        />
    );
}

export default CalendarPage
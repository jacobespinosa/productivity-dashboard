import { getCurrentWeekStart } from "./dateUtils";

export function getWeeklyTaskStats(tasksByDate) {

    let totalTasks = 0;
    let totalTasksCompleted = 0;
    const currentWeekStart = getCurrentWeekStart();
    const weekStart = new Date(currentWeekStart);

    for (let i = 0; i < 7; i++) {
        const dateKey = weekStart.toLocaleDateString();

        totalTasks += tasksByDate[dateKey].length;

        for (let task of tasksByDate[dateKey]) {
            totalTasksCompleted += task.isDone;
        }
        weekStart.setDate(weekStart.getDate() + 1);
    }

    return { totalTasks, totalTasksCompleted };
}

export function getDueStatus(task) {
    if (task.isDone) return "";

    const [year, month, day] = task.dueDate.split("-");
    const taskDueDate = new Date(year, month - 1, day);

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    const futureDate = new Date(todayDate);
    futureDate.setDate(futureDate.getDate() + 2);

    if (taskDueDate < todayDate) {
        return "overdue";
    }
    else if (taskDueDate < futureDate) {
        return "due-soon";
    }
    else {
        return "";
    }
}
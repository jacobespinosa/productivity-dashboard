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
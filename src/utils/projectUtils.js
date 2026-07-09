import { getCurrentWeekStart } from '../utils/dateUtils';

export function getTextColor(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 160 ? "#222" : "#fff";
}

export function getWeeklyProjectStats(projects, tasksByDate) {
        const weekStart = getCurrentWeekStart();
        const projectMap = new Map();
        const projectStats = [];

        for (let index = 0; index < 7; index++) {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + index);

            const dateKey = date.toLocaleDateString('en-US');
            const tasks = tasksByDate[dateKey] || [];

            tasks.forEach((task => {
                const timeSpent = projectMap.get(task.projectId) || 0;
                projectMap.set(task.projectId, timeSpent + (task.time || 0));
            }))
        };

        for (const [id, time] of projectMap) {
            const projectObj = projects.find(project => project.id === id);

            if (projectObj) {
                projectStats.push({project: projectObj, time});
            }
        }
        return projectStats;
}
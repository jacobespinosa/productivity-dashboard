import { getCurrentWeekStart } from "./dateUtils";

export function formatMinutesHHMM(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins  = Math.floor(minutes % 60);
    return `${hours > 0 ? `${hours}h ` : ""}${mins}m`;
}

export function formatSecondsHHMMSS(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const hh = hours.toString().padStart(2, "0");
    const mm = minutes.toString().padStart(2, "0");
    const ss = seconds.toString().padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
}

export function formatSecondsHHMM(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const hh = hours.toString().padStart(2, "0");
    const mm = minutes.toString().padStart(2, "0");
    return `${hh}:${mm}`;
}

export function getWeeklyTimeStats(timeByDate) {
    const currentWeekStart = getCurrentWeekStart();

    const weekStart = new Date(currentWeekStart);
    let totalTime = 0;

    for (let i = 0; i < 7; i++) {
        let dateKey = weekStart.toLocaleDateString();

        totalTime += timeByDate[dateKey];

        weekStart.setDate(weekStart.getDate() + 1);
    }
    return totalTime;
}
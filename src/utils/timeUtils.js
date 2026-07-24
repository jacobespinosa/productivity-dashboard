import { getCurrentWeekStart } from "./dateUtils";

export function formatMinutesHHMM(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins  = Math.floor(minutes % 60);
    return `${hours > 0 ? `${hours}h ` : ""}${mins > 0 ? `${mins}m` : ""}`;
}

export function formatMinutesHHMMIncludeZero(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins  = Math.floor(minutes % 60);
    return `${hours > 0 ? `${hours}h ` : ""}${mins > 0 ? `${mins}m` : "0m"}`;
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

/* returns total seconds for week */
export function getWeeklyTotalTime(timeByDate, weekStart) {
    const currentDate = new Date(weekStart);
    let totalTime = 0;

    for (let i = 0; i < 7; i++) {
        let dateKey = currentDate.toLocaleDateString('en-US');

        totalTime += timeByDate[dateKey] ?? 0;

        currentDate.setDate(currentDate.getDate() + 1);
    }
    return totalTime;
}

export function getWeekStartISO() {
    const currentWeekStart = getCurrentWeekStart();
    return new Date(currentWeekStart).toISOString().split('T')[0];
}

export function getWeeklyTimeStats(timeByDate) {
    const weekStart = getCurrentWeekStart();
    const weeklyTimeStats = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(weekStart);
        date.setDate(date.getDate() + i);

        const dateKey = date.toLocaleDateString('en-US');
        const day = date.toLocaleDateString('en-US', {weekday: 'short'})
        const timeSeconds = timeByDate[dateKey] || 0;
        const timeDisplay = formatMinutesHHMMIncludeZero(timeSeconds/60);
        const time = timeSeconds / 60;

        weeklyTimeStats.push({day, time, timeDisplay})
    }
    return weeklyTimeStats;
}

export function formatTime12Hour(date) {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}
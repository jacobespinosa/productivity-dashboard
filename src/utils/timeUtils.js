import { getCurrentWeekStart } from "./dateUtils";

export function formatMinutesHHMM(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins  = Math.floor(minutes % 60);
    return `${hours > 0 ? `${hours}h ` : ""}${mins > 0 ? `${mins}m` : ""}`;
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

        totalTime += timeByDate[dateKey] ?? 0;

        weekStart.setDate(weekStart.getDate() + 1);
    }
    return totalTime;
}

export function getWeekStartISO() {
    const currentWeekStart = getCurrentWeekStart();
    return new Date(currentWeekStart).toISOString().split('T')[0];
}

export function formatISOMMDD(date) {
    /* 2026-06-22 -> 6/22 */
    if (!date) return

    let dateArray = date.split('-');
    dateArray.shift();
    dateArray[0] = dateArray[0].replace(/^0+/, '');
    dateArray[1] = dateArray[1].replace(/^0+/, '');
    return dateArray.join('/');
}
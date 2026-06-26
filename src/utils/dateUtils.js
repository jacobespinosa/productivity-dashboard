export function getCurrentWeekStart() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - daysToSubtract);

    return weekStart;
}

export function getDaySuffix(day) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

export function getCurrentWeekRange(startOfWeek) {
    const startDate = new Date(startOfWeek);
    const endDate = new Date(startOfWeek);
    endDate.setDate(startDate.getDate() + 6);

    const startMonth = startDate.toLocaleDateString('default', {month: 'short'});
    const endMonth = endDate.toLocaleDateString('default', {month: 'short'});

    const start = startDate.getDate()
    const end = endDate.getDate();

    const startPrefix = getDaySuffix(start);
    const endPrefix = getDaySuffix(end);
    return `${startMonth} ${start}${startPrefix} - ${
        startMonth !== endMonth ? `${endMonth} ` : ""
    }${end}${endPrefix}`;
}
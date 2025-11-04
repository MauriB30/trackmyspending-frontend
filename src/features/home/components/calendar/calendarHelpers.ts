function isLeapYear(year: number) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return 29;
    }
    return 28;
}

export function getMonths(year: number) {
    return [
        { id: 0, name: 'Enero', days: 31 },
        { id: 1, name: 'Febrero', days: isLeapYear(year) },
        { id: 2, name: 'Marzo', days: 31 },
        { id: 3, name: 'Abril', days: 30 },
        { id: 4, name: 'Mayo', days: 31 },
        { id: 5, name: 'Junio', days: 30 },
        { id: 6, name: 'Julio', days: 31 },
        { id: 7, name: 'Agosto', days: 31 },
        { id: 8, name: 'Septiembre', days: 30 },
        { id: 9, name: 'Octubre', days: 31 },
        { id: 10, name: 'Noviembre', days: 30 },
        { id: 11, name: 'Diciembre', days: 31 },
    ];
}

export function getPreviousDays(year: number, numberMonth: number) {
    const firstDayOfWeek = new Date(year, numberMonth, 1).getDay();
    const days = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    const previousMonthLastDay = new Date(year, numberMonth, 0).getDate();
    const previousMonthDays = Array.from({ length: days }, (_, index) => previousMonthLastDay - index);
    return previousMonthDays.reverse();
}

export function getNextDays(year: number, numberMonth: number) {
    const lastDayOfWeek = new Date(year, numberMonth + 1, 0).getDay();
    const days = lastDayOfWeek === 0 ? 0 : 7 - lastDayOfWeek;
    const nextMonthDays = Array.from({ length: days }, (_, index) => index + 1);
    return nextMonthDays;
}

export function getYearsAround(actualYear: number) {
    const pastYears = Array.from({ length: 5 }, (_, index) => ({
        id: 5 - (index + 1),
        year: actualYear - (index + 1),
    })).reverse();

    console.log(pastYears);

    const nextYears = Array.from({ length: 5 }, (_, index) => ({
        id: 5 + (index + 1),
        year: actualYear + (index + 1),
    }));

    console.log(nextYears);
    return [...pastYears, { id: 5, year: actualYear }, ...nextYears];
}

export function isToday(day: number, monthId: number, year: number) {
    const date = new Date();
    return day === date.getDate() && monthId === date.getMonth() && year === date.getFullYear();
}

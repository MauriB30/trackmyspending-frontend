export interface Month {
    id: number;
    name: string;
    days: number;
}

export interface CalendarProps {
    today: {
        day: number;
        month: number;
        year: number;
    };
    setToday: React.Dispatch<
        React.SetStateAction<{
            day: number;
            month: number;
            year: number;
        }>
    >;
    setOpenCalendar: React.Dispatch<React.SetStateAction<boolean>>;
}

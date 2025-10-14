const days = [
    { id: 1, name: 'Lunes', shortName: 'Lun' },
    { id: 2, name: 'Martes', shortName: 'Mar' },
    { id: 3, name: 'Miercoles', shortName: 'Mie' },
    { id: 4, name: 'Jueves', shortName: 'Jue' },
    { id: 5, name: 'Viernes', shortName: 'Vie' },
    { id: 6, name: 'Sabado', shortName: 'Sab' },
    { id: 0, name: 'Domingo', shortName: 'Dom' },
];

export default function WeekDays() {
    return (
        <ul className='flex gap-5'>
            {days.map((day) => (
                <li key={day.id}>{day.shortName}</li>
            ))}
        </ul>
    );
}

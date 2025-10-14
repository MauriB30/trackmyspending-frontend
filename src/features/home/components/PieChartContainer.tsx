import type { DefaultizedPieValueType } from '@mui/x-charts';
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';

interface PieItem {
    id: number;
    value: number;
    label: string;
}

interface Props {
    totalExpenses: number;
    data: PieItem[];
}

function calculatePercentage(params: DefaultizedPieValueType, totalExpenses: number): string {
    const percentage = (params.value / totalExpenses) * 100;
    return percentage.toFixed(2);
}

export default function PieChartContainer({ totalExpenses, data }: Props) {
    return (
        <div>
            <PieChart
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                        fill: 'white', // color de los numeros de adentro del arco.
                        fontSize: '25px', // tamaño de la fuente de los numeros.
                    },
                    '& path': {
                        stroke: 'black', // color del borde.
                        strokeWidth: 1, // ancho del borde.
                    },
                }}
                width={500}
                height={400}
                hideLegend
                slotProps={{ legend: { sx: { color: 'white', fontSize: '20px' } } }} // color del texto de los nombres de las etiquetas.
                series={[
                    {
                        arcLabel: (value) => `${calculatePercentage(value, totalExpenses)}%`, // funcion que calcula el porcentaje de cada valor.
                        arcLabelRadius: '65%',
                        arcLabelMinAngle: 20,
                        data,
                    },
                ]}
            />
        </div>
    );
}

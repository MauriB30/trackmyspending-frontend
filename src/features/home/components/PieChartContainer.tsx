import { createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
});

export default function PieChartContainer({ totalExpenses, data }: Props) {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const size = {
        width: isSmallScreen ? 250 : 350,
        height: isSmallScreen ? 250 : 350,
    };
    return (
        <div>
            <PieChart
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                        fill: 'white', // color de los numeros de adentro del arco.
                        font: 'bold',
                    },
                    '& path': {
                        stroke: 'black', // color del borde.
                        strokeWidth: 1, // ancho del borde.
                    },
                }}
                {...size}
                hideLegend
                slotProps={{ legend: { sx: { color: 'white', fontSize: '20px' } } }} // color del texto de los nombres de las etiquetas.
                series={[
                    {
                        arcLabel: (value) => `${calculatePercentage(value, totalExpenses)}%`, // funcion que calcula el porcentaje de cada valor.
                        arcLabelRadius: '85%',
                        arcLabelMinAngle: 1,
                        data,
                    },
                ]}
            />
        </div>
    );
}

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import type { IExpense } from '../pages/Home';
import { mapLegendData } from '../utils/chartUtils';

export interface LegendProps {
    data: IExpense[];
    handleOpenLegend: (id: number) => void;
    categoryId: number | undefined;
}

export default function PieLegend({ data, handleOpenLegend, categoryId }: LegendProps) {
    const categories = mapLegendData(data);

    return (
        <ul className='legend-container sm:text-2xl'>
            {categories.map((category) => (
                <li key={category.id} className='legend-items'>
                    <div onClick={() => handleOpenLegend(category.id)} className='legend-item flex cursor-pointer items-center gap-3'>
                        <div className='h-3 w-3 rounded-full' style={{ backgroundColor: category.color }}></div>
                        <span style={{ color: category.color }}>{category.label}</span>
                        <ArrowDownwardIcon />
                        <span>${category.value}</span>
                    </div>

                    {categoryId === category.id && category.subCategories && (
                        <ul className='subLegend-items ml-6'>
                            {category.subCategories?.map((sub) => (
                                <li key={sub.id} className='subLegend-item flex items-center gap-3'>
                                    <div className='h-3 w-3 rounded-full' style={{ backgroundColor: sub.color }}></div>
                                    <span style={{ color: sub.color }}>{sub.label}</span>
                                    <span>${sub.value}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
}

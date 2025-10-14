import type { IExpense } from '../pages/Home';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
const SUBCOLORS = ['#FF9AA2', '#9AD0F5', '#FFE29A', '#A0E7E5', '#D1B3FF'];

export function mapLegendData(data: IExpense[]) {
    return data.map((item, index) => ({
        id: item.id,
        value: item.amount,
        label: item.category,
        color: COLORS[index],
        subCategories: item.subcategories?.map((item, index) => ({
            id: item.id,
            value: item.amount,
            label: item.category,
            color: SUBCOLORS[index],
        })),
    }));
}

export function mapChartData(data: IExpense[], id?: number) {
    if (typeof id === 'number' && data[id]?.subcategories) {
        return data[id].subcategories.map((item, index) => ({
            id: item.id,
            value: item.amount,
            label: item.category,
            color: SUBCOLORS[index],
        }));
    }

    return data.map((item, index) => ({
        id: item.id,
        value: item.amount,
        label: item.category,
        color: COLORS[index],
    }));
}

export function calculateTotalExpenses(data: IExpense[]) {
    return data.reduce((total, t) => {
        const amount = t.amount;
        return total + amount;
    }, 0);
}

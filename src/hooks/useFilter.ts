interface Item {
    id: number;
    name: string;
}

function normalizeString(str: string) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

export default function useFilter(items: Item[], query: string) {
    const normalizedQuery = normalizeString(query);
    return items.filter((item: Item) => {
        return normalizeString(item.name).includes(normalizedQuery);
    });
}

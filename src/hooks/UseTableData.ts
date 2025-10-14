import { useEffect, useState } from 'react';
import type { ApiCreateResponse, ApiListResponse } from '../interfaces/apiResponses';

interface useTableProps<T, U = T> {
    fetchItemsService: (query: string) => Promise<ApiListResponse<T>>;
    createItemService: (newItem: T) => Promise<ApiCreateResponse<T>>;
    fetchSubItemsService?: (id: number) => Promise<ApiListResponse<U>>;
    createSubItemService?: (newSubItem: U, parentId: number) => Promise<ApiCreateResponse<U>>;
    initialQuery?: string;
}

interface SubItemsMap<U> {
    [parentId: string]: U[];
}

export function useTableData<T, U = T>({
    fetchItemsService,
    createItemService,
    createSubItemService,
    fetchSubItemsService,
    initialQuery = '',
}: useTableProps<T, U>) {
    const [items, setItems] = useState<T[]>([]);
    const [subItems, setSubItems] = useState<SubItemsMap<U>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState(initialQuery);

    console.log('usando usetableData');

    useEffect(() => {
        async function fetchItems(searchQuery: string) {
            setLoading(true);
            setError(null);

            try {
                const { items } = await fetchItemsService(searchQuery);
                setItems(items);
            } catch {
                setError('Error al cargar los datos intenta de nuevo más tarde.');
            } finally {
                setLoading(false);
            }
        }
        fetchItems(query);
    }, [query, fetchItemsService]);

    async function fetchSubItems(id: number) {
        console.log('usando fetchSubItems con id: ', id);
        if (!fetchSubItemsService || subItems[id]) return;

        try {
            const { items } = await fetchSubItemsService(id);
            setSubItems((prev) => ({ ...prev, [id]: items }));
        } catch (error) {
            console.log(error);
        }
    }

    async function addItem(newItem: T) {
        const { success, message, createdItem } = await createItemService(newItem);

        if (success && createdItem) {
            setItems((prev) => [...prev, createdItem]);
        }

        return { success, message };
    }

    async function addSubItem(newSubItem: U, parentId: number) {
        if (!createSubItemService) {
            return {
                success: false,
                message: 'Servicio no disponible',
            };
        }

        const { success, message, createdItem } = await createSubItemService(newSubItem, parentId);

        if (success && createdItem) {
            setSubItems((prev) => ({
                ...prev,
                [parentId]: [...(prev[parentId] || []), createdItem],
            }));
        }

        return {
            success,
            message,
        };
    }

    return {
        items,
        loading,
        error,
        addItem,
        setQuery,
        subItems,
        addSubItem,
        fetchSubItems,
    };
}

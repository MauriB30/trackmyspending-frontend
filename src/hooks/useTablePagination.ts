import { useCallback, useMemo, useState } from 'react';

interface PaginationState {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
}

export function useTablePagination(initialItemsPerPage: number = 10) {
    const [paginationState, setPaginationState] = useState<PaginationState>({
        currentPage: 1,
        itemsPerPage: initialItemsPerPage,
        totalItems: 0,
    });

    const changePage = useCallback((page: number) => {
        setPaginationState((prev) => ({
            ...prev,
            currentPage: page,
        }));
    }, []);

    const changeItemsPerPage = useCallback((itemsPerPage: number) => {
        setPaginationState((prev) => ({
            ...prev,
            itemsPerPage,
            currentPage: 1, // Reset a la primera página cuando cambia el número de items
        }));
    }, []);

    const setTotalItems = useCallback((totalItems: number) => {
        setPaginationState((prev) => ({
            ...prev,
            totalItems,
        }));
    }, []);

    const resetPagination = useCallback(() => {
        setPaginationState({
            currentPage: 1,
            itemsPerPage: initialItemsPerPage,
            totalItems: 0,
        });
    }, [initialItemsPerPage]);

    // Calcular valores derivados
    const totalPages = useMemo(() => {
        return Math.ceil(paginationState.totalItems / paginationState.itemsPerPage);
    }, [paginationState.totalItems, paginationState.itemsPerPage]);

    const startIndex = useMemo(() => {
        return (paginationState.currentPage - 1) * paginationState.itemsPerPage;
    }, [paginationState.currentPage, paginationState.itemsPerPage]);

    const endIndex = useMemo(() => {
        return Math.min(startIndex + paginationState.itemsPerPage, paginationState.totalItems);
    }, [startIndex, paginationState.itemsPerPage, paginationState.totalItems]);

    const hasNextPage = useMemo(() => {
        return paginationState.currentPage < totalPages;
    }, [paginationState.currentPage, totalPages]);

    const hasPreviousPage = useMemo(() => {
        return paginationState.currentPage > 1;
    }, [paginationState.currentPage]);

    const nextPage = useCallback(() => {
        if (hasNextPage) {
            changePage(paginationState.currentPage + 1);
        }
    }, [hasNextPage, changePage, paginationState.currentPage]);

    const previousPage = useCallback(() => {
        if (hasPreviousPage) {
            changePage(paginationState.currentPage - 1);
        }
    }, [hasPreviousPage, changePage, paginationState.currentPage]);

    const goToFirstPage = useCallback(() => {
        changePage(1);
    }, [changePage]);

    const goToLastPage = useCallback(() => {
        changePage(totalPages);
    }, [changePage, totalPages]);

    return {
        // Estado
        currentPage: paginationState.currentPage,
        itemsPerPage: paginationState.itemsPerPage,
        totalItems: paginationState.totalItems,
        totalPages,

        // Índices para paginación
        startIndex,
        endIndex,

        // Estados booleanos
        hasNextPage,
        hasPreviousPage,

        // Funciones
        changePage,
        changeItemsPerPage,
        setTotalItems,
        resetPagination,
        nextPage,
        previousPage,
        goToFirstPage,
        goToLastPage,
    };
}

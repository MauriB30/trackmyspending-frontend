import { useCallback, useMemo, useState } from 'react';

interface ExpansionState {
    [key: number]: {
        open: boolean;
        isCreating: boolean;
    };
}

export function useTableExpansion() {
    const [expansionState, setExpansionState] = useState<ExpansionState>({});

    const toggleRow = useCallback((id: number) => {
        setExpansionState((prev) => ({
            ...prev,
            [id]: {
                open: !prev[id]?.open,
                isCreating: false,
            },
        }));
    }, []);

    const openRow = useCallback((id: number) => {
        setExpansionState((prev) => ({
            ...prev,
            [id]: {
                open: true,
                isCreating: false,
            },
        }));
    }, []);

    const closeRow = useCallback((id: number) => {
        setExpansionState((prev) => ({
            ...prev,
            [id]: {
                open: false,
                isCreating: false,
            },
        }));
    }, []);

    const openInput = useCallback((id: number) => {
        setExpansionState((prev) => ({
            ...prev,
            [id]: {
                open: true,
                isCreating: true,
            },
        }));
    }, []);

    const closeInput = useCallback((id: number) => {
        setExpansionState((prev) => ({
            ...prev,
            [id]: {
                open: prev[id]?.open || false,
                isCreating: false,
            },
        }));
    }, []);

    const isRowExpanded = useCallback(
        (id: number) => {
            return expansionState[id]?.open || false;
        },
        [expansionState]
    );

    const isInputOpen = useCallback(
        (id: number) => {
            return expansionState[id]?.isCreating || false;
        },
        [expansionState]
    );

    const expandedRows = useMemo(() => {
        return Object.keys(expansionState)
            .filter((key) => expansionState[Number(key)]?.open)
            .map((key) => Number(key));
    }, [expansionState]);

    const clearAll = useCallback(() => {
        setExpansionState({});
    }, []);

    return {
        expansionState,
        toggleRow,
        openRow,
        closeRow,
        openInput,
        closeInput,
        isRowExpanded,
        isInputOpen,
        expandedRows,
        clearAll,
    };
}

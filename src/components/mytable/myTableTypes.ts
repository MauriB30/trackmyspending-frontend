import type { ApiCreateResponse } from '../../interfaces/apiResponses';

export interface TableToolbarProps {
    title: string;
    textButton: string;
    dualButtons?: boolean;
}

export interface TableColumnProps<T> {
    label: string;
    accessor: keyof T;
    sortable?: boolean;
    position?: 'text-left' | 'text-center' | 'text-right';
}

export interface TableInputProp<T> {
    accessor: keyof T;
    label?: string;
    inputType?: 'text' | 'number' | 'select' | 'date';
    position?: 'text-left' | 'text-center' | 'text-right';
    options?: { id: number; name: string; symbol?: string }[];
}

export type ActionType = 'edit' | 'delete' | 'add' | 'save';

export interface TableGeneralConfig<T> {
    toolbar: TableToolbarProps;
    columns: TableColumnProps<T>[];
    inputsRow: TableInputProp<T>[];
    actions: ActionType[];
}

export interface ExpandableTableConfig<U> {
    subColumns: TableColumnProps<U>[];
    subInputsRow: TableInputProp<U>[];
}

export interface MyTableProps<T, U = T> {
    data: T[];
    subData?: Record<string, U[]>;
    config: TableGeneralConfig<T>;
    expandableConfig?: ExpandableTableConfig<U>;
    onAdd: (newItem: T) => Promise<ApiCreateResponse<T>>;
    onSubAdd?: (newItem: U, parentId: number) => Promise<ApiCreateResponse<U>>;
    fetchSubItems?: (id: number) => void;
}

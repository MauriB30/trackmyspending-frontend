import React from 'react';
import type { FieldValues } from 'react-hook-form';

export interface ColumnHeader {
    text: string;
    className?: string;
    sortable?: boolean;
    onSort?: () => void;
    colSpan?: number;
}

export interface InputField {
    name: string;
    placeholder?: string;
    type?: string;
    maxLength?: number;
    visible?: boolean;
    tdClassName?: string;
    options?: { id: number; name: string; symbol?: string }[];
}

export interface Column<T> {
    accessor: keyof T;
    className?: string;
}

export interface SubColumns<T> {
    arrayKey: keyof T;
    subKeys: Column<T>[];
}

export interface HeadTable {
    title: string;
    setQuery: (value: string) => void;
    textButton: string;
    dualButtons: boolean;
}

export interface TableProps<T extends FieldValues & { id: number }, U extends FieldValues = Record<string, unknown>> {
    data: T[];
    isExpandable: boolean;
    columns: Column<T>[];
    subColumn?: SubColumns<T>;
    head: HeadTable;
    headers: ColumnHeader[];
    inputs: InputField[];
    expandableInputs?: InputField[];
    showActions: boolean;
    userId?: number;
    addItem: (value: T) => Promise<{ success: boolean; message: string; newData?: T }>;
    addSubItem?: (value: U) => Promise<{ success: boolean; message: string; newData?: U }>;
    deleteItem: (id: number) => Promise<{ success: boolean; message: string }>;
    setQuery: (query: string) => void;
    updateData: React.Dispatch<React.SetStateAction<T[]>>;
}

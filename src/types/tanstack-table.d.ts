import { FilterFn } from '@tanstack/react-table'

declare module '@tanstack/react-table' {
    interface FilterFns<TData extends object> {
        between: FilterFn<TData>
    }
}
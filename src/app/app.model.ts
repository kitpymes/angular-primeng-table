import { FilterMetadata, SortMeta } from "primeng/api";

export interface Country {
  name?: string;
  code?: string;
};

export interface Representative {
  name?: string;
  image?: string;
};

export interface Customer {
  id?: number;
  name?: number;
  country?: Country;
  company?: string;
  date?: string;
  status?: string;
  representative?: Representative;
};

export interface SortData {
  field: string;
  order: number;
};

export interface FilterData {
  /**
   * The value used for filtering.
   */
  value?: any;
  /**
   * The match mode for filtering.
   */
  matchMode?: string;
  /**
   * The operator for filtering.
   */
  operator?: string;
};

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
};

export interface RequestFilterData {
  first: number;
  rows: number;
  sortField: string | string[] | null | undefined;
  sortOrder: SortOrder;
  globalFilter: string | string[] | undefined | null;
  multiSort: SortData[] | undefined | null;
  last: number | undefined | null;
  filters?: {
    [s: string]: FilterData | FilterData[] | undefined;
};
};

import { defineStore } from 'pinia'

export const useFiltersStore = defineStore('filters', {
  state: () => ({
    filterWarehouseName: '',
    filterBrand: '',
    filterDate: '',
    filterNmId: '',
    filterCategory: '',
    minPrice: null as number | null,
    currentPage: 1,
    itemsPerPage: 10,
  }),
})

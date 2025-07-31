import { defineStore } from 'pinia'

export const useMetricsStore = defineStore('metrics', {
  state: () => ({
    currentValues: {} as Record<string, Record<number, number>>,
    dateFrom: '' as string,
    dateTo: '' as string,
  }),
  actions: {
    addCurrentValue(field: string, nmId: number, value: number) {
      if (!this.currentValues[field]) {
        this.currentValues[field] = {}
      }
      this.currentValues[field][nmId] = value
    },
    addDate(dateFrom: string, dateTo: string) {
      this.dateFrom = dateFrom
      this.dateTo = dateTo
    },
  },
})

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasks'
import { useAuthStore } from '@/stores/auth'

export const useFiltersStore = defineStore('filters', () => {
  const tasksStore = useTasksStore()
  const authStore = useAuthStore()
  const filters = ref([])
  const visibleFilters = ref(false)

  const getStorageKey = async () => {
    const isUserValid = await authStore.getUser()
    const userId = isUserValid ? authStore.user.id : 'guest'
    return `filters_${userId}`
  }

  /**
   * Apply filters to tasks
   * @param {array} tasks tasks array to apply the filters to
   */
  const applyFilters = (tasks) => {
    // Apply filters
    filters.value.forEach((filter) => {
      switch (filter.filterName) {
        case 'state':
          tasks = tasks.filter((task) => {
            if (filter.filterValues.length === 0 || filter.filterValues.length === 2) return true

            return (
              (filter.filterValues.includes('done') && task.completed) ||
              (filter.filterValues.includes('todo') && !task.completed)
            )
          })
          break
      }
    })

    return tasks
  }

  const isFilterApplied = () => {
    let filtered = false
    filters.value.forEach((filter) => {
      switch (filter.filterName) {
        case 'state':
          if (filter.filterValues.length === 1) {
            filtered = true
          }
          break
      }
    })

    return filtered
  }

  /**
   * Add or update a filter in the store
   * @param {string} filterName the name of the filter
   * @param {array} filterValues values of the filter
   */
  const addOrUpdateFilter = async (filterName, filterValues) => {
    const existingFilter = filters.value.find((filter) => filter.filterName === filterName)
    if (existingFilter) {
      existingFilter.filterValues = filterValues
    } else {
      filters.value.push({
        filterName: filterName,
        filterValues: filterValues,
      })
    }

    const storageKey = await getStorageKey()
    localStorage.setItem(storageKey, JSON.stringify(filters.value))
    tasksStore.loadTasks()
  }

  const getFilter = (filterName) => {
    return filters.value.find((filter) => filter.filterName === filterName)
  }

  const setFiltersFromStorage = async () => {
    const storageKey = await getStorageKey()
    const filtersInStorage = localStorage.getItem(storageKey)
    filters.value = filtersInStorage ? JSON.parse(filtersInStorage) : []
  }

  const setFilters = (filters) => {
    filters.value = filters
  }

  return {
    filters,
    applyFilters,
    isFilterApplied,
    addOrUpdateFilter,
    visibleFilters,
    getFilter,
    setFiltersFromStorage,
    setFilters,
  }
})

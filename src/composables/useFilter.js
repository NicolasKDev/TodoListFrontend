// composables/useFilter.ts
import { ref, watch, onMounted } from 'vue'
import { useFiltersStore } from '@/stores/filters'
import { useTasksStore } from '@/stores/tasks'

export function useFilter(filterName, defaultValues = []) {
  const filtersStore = useFiltersStore()
  const tasksStore = useTasksStore()
  const filterValues = ref(defaultValues)

  watch(filterValues, () => {
    filtersStore.addOrUpdateFilter(filterName, filterValues.value)
  })

  watch(
    () => filtersStore.getFilter(filterName)?.filterValues,
    (newValue) => {
      filterValues.value = newValue || defaultValues
    },
  )

  onMounted(() => {
    filtersStore.setFiltersFromStorage()
    filterValues.value = filtersStore.getFilter(filterName)?.filterValues || defaultValues

    tasksStore.loadTasks()
  })

  return {
    filterValues,
  }
}

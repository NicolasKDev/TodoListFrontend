<template>
  <div class="2xl:absolute top-17.5 2xl:right-8 2xl:w-80 z-50 min-w-50 w-1/4 mx-auto">
    <div class="flex justify-start w-full mb-2">
      <simple-button
        class="w-full"
        @click="filtersStore.visibleFilters = !filtersStore.visibleFilters"
      >
        Filtres
      </simple-button>
    </div>
    <div
      v-if="filtersStore.visibleFilters"
      class="bg-white rounded-lg shadow-lg p-4 2xl:w-80 space-y-1 mb-4 w-full"
    >
      <div class="flex items-center space-x-2 p-2">
        <span class="text-lg font-medium">State</span>
      </div>
      <label class="flex items-center space-x-2 cursor-pointer hover:bg-emerald-50 p-2 rounded">
        <input type="checkbox" name="todo" value="todo" v-model="stateValue" class="w-4 h-4" />
        <span>Todo</span>
      </label>
      <label class="flex items-center space-x-2 cursor-pointer hover:bg-emerald-50 p-2 rounded">
        <input type="checkbox" name="done" value="done" v-model="stateValue" class="w-4 h-4" />
        <span>Done</span>
      </label>
    </div>
  </div>
</template>

<script setup>
  import SimpleButton from '@/components/SimpleButton.vue'
  import { ref } from 'vue'
  import { useTasksStore } from '@/stores/tasks'
  import { watch } from 'vue'
  import { onMounted } from 'vue'
  import { useFiltersStore } from '@/stores/filters'

  const stateValue = ref(['todo', 'done'])
  const tasksStore = useTasksStore()
  const filtersStore = useFiltersStore()

  watch(stateValue, () => {
    filtersStore.addOrUpdateFilter('state', stateValue.value)
  })

  watch(filtersStore.filters, () => {
    stateValue.value = filtersStore.filters
  })

  onMounted(() => {
    const filtersInStorage = localStorage.getItem('filters')
    filtersStore.filters = filtersInStorage ? JSON.parse(filtersInStorage) : []
    const stateFilter = filtersStore.filters.find((filter) => filter.filterName === 'state')
    stateValue.value = stateFilter?.filterValues || []
    tasksStore.loadTasks()
  })
</script>

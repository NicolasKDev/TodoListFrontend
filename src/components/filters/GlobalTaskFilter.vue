<template>
  <div class="2xl:absolute top-17.5 2xl:right-8 2xl:w-80 z-50 min-w-50 w-1/4 mx-auto">
    <div class="flex justify-start w-full mb-2">
      <simple-button
        class="w-full"
        @click="filtersStore.visibleFilters = !filtersStore.visibleFilters"
        data-testid="filters-button"
      >
        Filters
      </simple-button>
    </div>
    <div
      v-show="filtersStore.visibleFilters"
      class="bg-card rounded-lg shadow-lg p-4 2xl:w-80 space-y-1 mb-4 w-full"
      data-testid="filters-panel"
    >
      <state-filter />
    </div>
  </div>
</template>

<script setup>
  import SimpleButton from '@/components/SimpleButton.vue'
  import { useFiltersStore } from '@/stores/filters'
  import StateFilter from './StateFilter.vue'
  const filtersStore = useFiltersStore()
</script>

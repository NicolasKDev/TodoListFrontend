<template>
  <div class="2xl:absolute top-24 2xl:right-8 2xl:w-80 z-30 min-w-50 w-1/4 mx-auto">
    <div class="flex justify-start w-full mb-2">
      <simple-button
        class="w-full flex items-center justify-between"
        @click="filtersStore.visibleFilters = !filtersStore.visibleFilters"
        data-testid="filters-button"
      >
        <span class="px-2">Filters</span>
        <chevron-down-icon
          class="h-5 w-5 transition-transform duration-200"
          :class="{ 'rotate-180': filtersStore.visibleFilters }"
        />
      </simple-button>
    </div>
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div
        v-show="filtersStore.visibleFilters"
        class="bg-card rounded-lg shadow-lg p-4 2xl:w-80 space-y-4 mb-4 w-full border border-border"
        data-testid="filters-panel"
      >
        <div class="space-y-4">
          <state-filter />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
  import SimpleButton from '@/components/SimpleButton.vue'
  import { useFiltersStore } from '@/stores/filters'
  import StateFilter from './StateFilter.vue'
  import { ChevronDownIcon } from '@heroicons/vue/24/outline'

  const filtersStore = useFiltersStore()
</script>

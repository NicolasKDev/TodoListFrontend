<template>
  <task-filter class="2xl:block hidden" />
  <div class="relative flex flex-col justify-start items-start 2xl:w-4/5 w-full">
    <info-toast />
    <add-task />
    <task-filter class="2xl:hidden block" />
    <task-card-list />
  </div>
</template>

<script setup>
  import AddTask from '@/components/AddTask.vue'
  import TaskCardList from '@/components/TaskCardList.vue'
  import InfoToast from '@/components/InfoToast.vue'
  import TaskFilter from '@/components/TaskFilter.vue'
</script>

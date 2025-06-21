<template>
  <div>
    <side-menu />
    <div class="container mx-auto px-4 pt-8">
      <global-task-filter class="2xl:block hidden" />
      <div class="relative flex flex-col justify-start items-start 2xl:w-4/5 w-full">
        <add-task />
        <global-task-filter class="2xl:hidden block" />
        <task-card-list />
      </div>
    </div>
  </div>
</template>

<script setup>
  import AddTask from '@/components/AddTask.vue'
  import TaskCardList from '@/components/TaskCardList.vue'
  import GlobalTaskFilter from '@/components/filters/GlobalTaskFilter.vue'
  import SideMenu from '@/components/SideMenu.vue'
</script>

<template>

  <info-toast />

  <add-task />
  
  <div class="mt-2">
    <Task-card-list />
  </div>

</template>

<script setup>
  import AddTask from '@/components/AddTask.vue'
  import TaskCardList from '@/components/TaskCardList.vue';
  import InfoToast from '@/components/InfoToast.vue'
</script>
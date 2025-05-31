<template>
  <div
    class="flex w-full items-start justify-start p-2 rounded shadow hover:bg-emerald-300 space-x-2 cursor-pointer"
  >
    <input
      class="form-checkbox appearance-none shrink-0 w-4 h-4 border-2 border-blue-300 rounded-sm mx-2 my-2.5 bg-white checked:border-blue-300 checked:bg-blue-500"
      type="checkbox"
      v-model="localTask.completed"
      @change="emitUpdateTask(task, originalTitle)"
    />
    <div class="w-full" @click="enterEditMode">
      <input
        class="inline-block w-full lg:min-w-3xl rounded-xl px-2 py-1 mx-4 text-slate-800"
        type="text"
        v-if="modifyingId === task.id"
        v-model="localTask.title"
        v-focus
        @blur="emitUpdateTask(task, originalTitle)"
        @keyup.enter="emitUpdateTask(task, originalTitle)"
        @keyup.escape="exitEditMode"
      />
      <span
        class="inline-block w-full px-2 py-1 break-words align-top mx-4 text-slate-800"
        :class="task.completed ? 'line-through' : ''"
        v-else
        >{{ task.title }}</span
      >
    </div>
    <icon-button @click="$emit('deleteTask')">
      <TrashIcon class="h-4 w-4" />
    </icon-button>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import { TrashIcon } from '@heroicons/vue/24/solid'
  import IconButton from '@/components/IconButton.vue'

  const emit = defineEmits(['updateTask', 'deleteTask'])

  const props = defineProps({
    task: {
      type: Object,
      required: true,
    },
  })

  let originalTitle = ''
  // Id of the modified task
  const modifyingId = ref(null)

  // Utilisation de computed pour synchroniser avec props.task
  const localTask = computed({
    get: () => props.task,
    set: () => emitUpdateTask(),
  })

  // Custom directive that allows to focus an element when it is mounted
  const vFocus = {
    mounted: (el) => el.focus(),
  }

  /**
   * Sets the task field to be in edit mod
   */
  const enterEditMode = () => {
    modifyingId.value = props.task.id
    originalTitle = props.task.title
  }

  /**
   * Exit the edit mode and reset the task title to its original value
   */
  const exitEditMode = () => {
    modifyingId.value = null
    localTask.value.title = originalTitle
  }

  /**
   * Exit the edit mode and send an event to the parent to update the task's title
   */
  const emitUpdateTask = () => {
    modifyingId.value = null
    emit('updateTask', localTask.value, originalTitle)
  }
</script>

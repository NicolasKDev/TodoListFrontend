<template>
  <div ref="dropdownRef" class="relative">
    <settings-button :label="currentLocale.name" @click="isOpen = !isOpen">
      <template #icon>
        <ChevronDownIcon
          class="h-4 w-4 transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
        />
        <span class="text-lg">{{ currentLocale.flag }}</span>
      </template>
    </settings-button>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border z-50"
      >
        <div class="py-1">
          <button
            v-for="locale in availableLocales"
            :key="locale.code"
            @click="selectLocale(locale.code)"
            class="w-full flex items-center space-x-3 px-4 py-2 text-sm text-foreground hover:bg-accent/10 transition-colors"
            :class="{ 'bg-accent/20': locale.code === currentLocale.code }"
          >
            <span class="text-lg">{{ locale.flag }}</span>
            <span>{{ locale.name }}</span>
            <CheckIcon
              v-if="locale.code === currentLocale.code"
              class="h-4 w-4 ml-auto text-primary"
            />
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { ChevronDownIcon, CheckIcon } from '@heroicons/vue/24/outline'
  import SettingsButton from '@/components/SettingsButton.vue'
  import { setLocale, getAvailableLocales } from '@/i18n'

  const { locale } = useI18n()

  const isOpen = ref(false)
  const dropdownRef = ref(null)

  const availableLocales = getAvailableLocales()

  const currentLocale = computed(() => {
    return availableLocales.find((loc) => loc.code === locale.value) || availableLocales[0]
  })

  const selectLocale = (localeCode) => {
    if (localeCode !== locale.value) {
      setLocale(localeCode)
    }
    isOpen.value = false
  }

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
      isOpen.value = false
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
</script>

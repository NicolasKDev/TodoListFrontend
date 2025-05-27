import { defineStore } from "pinia";
import { ref } from "vue";

export const useToastStore = defineStore('toast', () => {
    const message = ref('');
    const type = ref('error');
    const showingTime = 4000;
    const show = (messageToShow, typeMessage) => {
        message.value = messageToShow;
        type.value = typeMessage;
        setTimeout(() => message.value = '', showingTime)
    };

    return { message, type, show }
})
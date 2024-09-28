<script setup>
import { useToast } from 'primevue/usetoast'; // Si usas PrimeVue
import { defineProps, onMounted } from 'vue';

// Definir los props que el componente acepta
const props = defineProps({
  name: String,
});
// Inicializar el toast
const toast = useToast();


onMounted(() => {
  console.log('Component mounted');
});
</script>

<template>
  <div>
    <small id="username-help" :class="{ 'p-invalid text-red-500': props.name }">
        <div v-if="props.name">
            <div v-for="(error, index) in props.name" :key="index">
                {{ error }}
            </div>
          
        </div>

        <div v-else>
          <small id="username-help" :class="{ 'p-invalid text-red-500': props.name }">
            <!-- Aquí podrías agregar algún contenido opcional o dejarlo vacío -->
             <div>{{ props.name }}</div>
            </small>
        </div>
    </small>
  </div>
</template>

<style scoped>

</style>
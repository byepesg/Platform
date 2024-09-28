<script setup>
import { defineProps } from 'vue';

// Define the props that the component will accept
const props = defineProps({
  errorsNew: Object,  // Object containing validation errors
  name: String        // Field name to look up in errorsNew
});

</script>

<template>
  <div>
    <!-- Render error messages for the dynamic field (based on `name`) -->
    <small id="username-help" :class="{ 'p-invalid text-red-700': props.errorsNew[props.name] }">
      {{ props.errorsNew[props.name] }}
    </small>
  </div>
</template>

<style scoped>
/* Add any additional styling here if needed */
</style>

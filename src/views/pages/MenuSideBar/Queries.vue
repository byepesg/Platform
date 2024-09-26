<script setup>

import ability from '@/service/ability.js';
</script>
<template>
    <div>
        <h1 v-if="ability.can('vista_1')">Comercial</h1>
        <pre>{{ ability }}</pre>
    </div>

</template>
<style scoped>
    h1 {
        font-size: 1.5em;
        color: #333;
        margin: 20px 0;
    }
</style>
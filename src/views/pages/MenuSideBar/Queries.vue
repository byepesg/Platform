<script setup>

import ability from '@/service/ability.js';
console.log(ability)

</script>
<template>
    <div>
        <h1 v-if="ability.can('vista_1')">Vista 1</h1>
        <h1 v-if="ability.can('xxxx')">XXXX</h1>
        <h1 v-if="ability.can('rol_crear','rol_crear')">Rol crear</h1>
    </div>

    <div>
        
        <div>{{ ability.rules }}</div>
        
        
    <!-- <pre>{{ abilityStore.getAbilities }}</pre> -->
    </div>

</template>
<style scoped>
    h1 {
        font-size: 1.5em;
        color: #333;
        margin: 20px 0;
    }
</style>
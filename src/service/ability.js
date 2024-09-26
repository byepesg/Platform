import { useAbilityStore } from '@/stores/abilities';
import { defineAbility } from '@casl/ability';
const abilityStore = useAbilityStore()

export default defineAbility((can, cannot) => {
    
        if (abilityStore.abilities.value.length === 0) {
            return;
        }
        abilityStore.abilities.value.forEach(ability => {
            can(ability);
        });
  
//   elementosVista.forEach(elemento => {can( elemento);});
//   can('hola','chao')
//   can('menu','comercial')

//   cannot('delete', 'User');
  
  
});
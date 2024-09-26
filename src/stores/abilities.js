// stores/abilities.js
import useData from '@/service/FetchData/FetchDataAPI.js';
import { defineStore } from 'pinia';
import { ref } from 'vue';
const { getRequest, postRequest, putRequest, deleteRequest,errorResponseAPI } = useData();
export const useAbilityStore = defineStore('abilities', () => {
  const abilities = ref([])

  // Fetch abilities based on the token
  async function fetchAbilities(values) {
    try {abilities.value = values;} 
    catch (error) {
      console.error('Error fetching abilities:', error)
    }
  }

  return { abilities, fetchAbilities }
})

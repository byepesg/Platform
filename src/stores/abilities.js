// stores/abilities.js
import useData from '@/service/FetchData/FetchDataAPI.js';
import { defineStore } from 'pinia';
import { ref } from 'vue';
const { getRequest, postRequest, putRequest, deleteRequest,errorResponseAPI } = useData();
const token = ref();

export const useAbilityStore = defineStore('abilities', {
    
    state: () => ({
        name: 'Tiago Rizzo',
        role: 'user',
        abilities: [
            {
                action: 'create',
                subject: 'user',
            },
        ],
    }),
    actions: {
        changeRole(role) {
            this.role = role;
        },
        setAbilities(abilities) {
            this.abilities = abilities;
        },
        async fetchAbilities() {
            token.value = sessionStorage.getItem('accessSessionToken');
            try {
                if (!token.value) {
                    console.log('No token found');
                    return;
                }
                const response = await getRequest('/abilities');
                
                const abilities = response.data.map((element) => {
                    
                    return {
                        action: element, 
                        subject: element,
                    };
                });
                
                this.setAbilities(abilities);  
            } catch (error) {
                console.error('Error fetching abilities:', error);
            }
        },
    },
    getters: {
        getAbilities() {
            return this.abilities;
        },
        getRole() {
            return this.role;
        },
        
    },
});

import useData from '@/service/FetchData/FetchDataAPI.js';
const { getRequest, postRequest, putRequest, deleteRequest,errorResponseAPI } = useData();
export const InitialDataService = {
    
    sizeData(){
        
        return { label: 'Normal', value: 'normal' }
    },
    sizeOptions() {
    return [
        { label: 'Small', value: 'small', class: 'sm' },
        { label: 'Normal', value: 'normal' },
        { label: 'Large', value: 'large', class: 'lg' }
        ]
    },
        getSize() {
            return Promise.resolve(this.sizeData());
        },

        getSizeOptions() {
            return Promise.resolve(this.sizeOptions());
        },
    
        async getBranches() {
            try {
                const response = await getRequest('/farms');
                return response;
            } catch (error) {
                console.error('Error fetching branches:', error);
                return response;; 
            }
        },

        async getCompanies() {
            try {
                const response = await getRequest('/companies');
                return response;
            } catch (error) {
                console.error('Error fetching company:', error);
                return errorResponseAPI(error); 
            }
        },
    getCustomers(params) {
        const queryParams = params
            ? Object.keys(params)
                  .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                  .join('&')
            : '';

        return fetch('https://www.primefaces.org/data/customers?' + queryParams).then((res) => res.json());
    }
};

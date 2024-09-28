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
    

    getCustomers(params) {
        const queryParams = params
            ? Object.keys(params)
                  .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                  .join('&')
            : '';

        return fetch('https://www.primefaces.org/data/customers?' + queryParams).then((res) => res.json());
    }
};

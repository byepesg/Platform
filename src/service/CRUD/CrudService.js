import useData from '@/service/FetchData/FetchDataAPI.js';
const { getRequest, postRequest, putRequest, deleteRequest,errorResponseAPI } = useData();

export const CrudService = (baseEndpoint) => ({
    /**
     * Get all records from a given endpoint
     * @param {Object} params - Query parameters for filtering, sorting, pagination, etc.
     * @returns {Promise} - A promise that resolves to the response from the GET request.
     */
    async getAll(params = {}) {
        const queryParams = new URLSearchParams(params).toString();
        const fullEndpoint = `${baseEndpoint}?${queryParams}`;
        return await getRequest(fullEndpoint);
    },

    /**
     * Get a single record by UUID
     * @param {String} uuid - The UUID of the record to retrieve.
     * @returns {Promise} - A promise that resolves to the record data.
     */
    async getById(uuid) {
        const fullEndpoint = `${baseEndpoint}/${uuid}`;
        return await getRequest(fullEndpoint);
    },

    /**
     * Create a new record
     * @param {Object} data - The data for the new record.
     * @returns {Promise} - A promise that resolves to the response from the POST request.
     */
    async create(data) {
        return await postRequest(baseEndpoint, data);
    },

    /**
     * Update an existing record by UUID
     * @param {String} uuid - The UUID of the record to update.
     * @param {Object} data - The updated data for the record.
     * @returns {Promise} - A promise that resolves to the response from the PUT request.
     */
    async update(uuid, data) {
        
        return await putRequest(baseEndpoint, data,uuid);
    },

    /**
     * Delete a record by UUID
     * @param {String} uuid - The UUID of the record to delete.
     * @returns {Promise} - A promise that resolves to the response from the DELETE request.
     */
    async delete(uuid) {
        

        return await deleteRequest(baseEndpoint, uuid);
    },
    getErrorResponse() {
        return errorResponseAPI;
    }
});

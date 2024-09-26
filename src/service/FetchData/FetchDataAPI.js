// Objetivo: Crear un hook para realizar peticiones a la API
import useSettingsAPI from '@/service/FetchData/API_Settings';
import { ref } from 'vue';
export default function useData() {
    const { pathAPI, APISettings } = useSettingsAPI();
    const token = ref();
    let errorResponseAPI = ref('Error no filled');
    let base = pathAPI().base;
    let api = pathAPI().apiVer;
    token.value = sessionStorage.getItem('accessSessionToken');

    const initializeToken = () => {
        token.value = sessionStorage.getItem('accessSessionToken');
        if (token.value) {
            APISettings.headers.set('Authorization', 'Bearer ' + token.value);
            
        }

    };

    initializeToken();
    APISettings.headers.set('Content-Type', 'application/json');
    APISettings.headers.set('Access-Control-Allow-Origin', '*');
    // APISettings.headers.set('Authorization', 'Bearer ' + token.value);

    async function getRequest(endPoint) {
        initializeToken();

        let responseData = { data: {}, error: '', ok: false };
        let baseUrl = `${base}${api}${endPoint}`;
        const requestOptions = {
            method: 'GET',
            headers: APISettings.headers
        };
        try {
            const response = await fetch(baseUrl, requestOptions);
            responseData.ok = response.ok;
            if (!response.ok) {
                responseData.error = response.statusText;
                throw new Error(`Error ${response.status} al obtener datos`);
            }
            responseData.data = await response.json();
        } catch (e) {
            console.error('Error en la solicitud GET:', e.message);
            responseData.error += ' ' + e.message;
        }
        return responseData;
    }

    async function postRequest(endPoint, data) {
        let responseData = { data: [], error: '', ok: false };
        let baseUrl = `${base}${api}${endPoint}`;
        const requestOptions = {
            method: 'POST',
            headers: APISettings.headers,
            body: JSON.stringify(data)
        };
        try {
            const response = await fetch(baseUrl, requestOptions);
            responseData.ok = response.ok;
            if (!response.ok) {
                responseData.error = response.statusText;

                const errorBody = await response.text();
                const errorBodyObject = JSON.parse(errorBody);

                console.error(`Error ${response.status}: ${errorBody}`);
                console.log('response', typeof errorBodyObject, errorBodyObject);
                responseData.error += ` ${errorBody}`;
                errorResponseAPI.value = errorBodyObject;

                throw new Error(`Error ${response.status} al enviar datos.`);
            }
            responseData.data = await response.json();
        } catch (e) {
            console.error('Error en la solicitud POST:', e.message);
            responseData.error += ' ' + e.message;
        }
        return responseData;
    }

    async function putRequest(endPoint, data, id) {
        let responseData = { data: [], error: '', ok: false };
        let baseUrl = `${base}${api}${endPoint}/${id}`;
        const requestOptions = {
            method: 'PUT',
            headers: APISettings.headers,
            body: JSON.stringify(data)
        };
        try {
            const response = await fetch(baseUrl, requestOptions);
            console.log('Response status:', response.status);
            console.log('Response headers:', [...response.headers]);

            responseData.ok = response.ok;
            if (!response.ok) {
                const errorBody = await response.text();
                const errorBodyObject = JSON.parse(errorBody);
                responseData.error += ` ${errorBody}`;
                errorResponseAPI.value = errorBodyObject;
                throw new Error(`Error ${response.status} al enviar datos.`);
            }
            responseData.data = await response.json();
        } catch (e) {
            console.error('Error en la solicitud POST:', e.message);
            responseData.error += ' ' + e.message;

        }
        return responseData;
    }

    async function deleteRequest(endPoint, id) {
        let responseData = { data: [], error: '', ok: false };
        let baseUrl = `${base}${api}${endPoint}/${id}`;
        const requestOptions = {
            method: 'DELETE',
            headers: APISettings.headers,
            body: JSON.stringify({})
        };
        try {
            const response = await fetch(baseUrl, requestOptions);
            responseData.ok = response.ok;
            responseData.data = await response.json();
            if (!response.ok) {
                responseData.error = response.statusText;
                throw new Error(`Error ${response.status} al enviar datos.`);
            }
        } catch (e) {
            console.error('Error en la solicitud POST:', e.message);
            responseData.error += ' ' + e.message;
        }
        return responseData;
    }

    async function patchRequest(endPoint, data, id) {
        let responseData = { data: [], error: '', ok: false };
        let baseUrl = `${base}${api}${endPoint}/${id}`;
        const requestOptions = {
            method: 'PATCH',
            headers: APISettings.headers,
            body: JSON.stringify(data)
        };
        try {
            const response = await fetch(baseUrl, requestOptions);
            responseData.ok = response.ok;
            if (!response.ok) {
                const errorBody = await response.text();
                const errorBodyObject = JSON.parse(errorBody);

                console.error(`Error ${response.status}: ${errorBody}`);
                console.log('response', typeof errorBodyObject, errorBodyObject);
                responseData.error += ` ${errorBody}`;
                errorResponseAPI.value = errorBodyObject;

                throw new Error(`Error ${response.status} al enviar datos.`);
            }
            responseData.data = await response.json();
        } catch (e) {
            console.error('Error en la solicitud PATCH:', e.message);
            responseData.error += ' ' + e.message;
            console.log(e);
        }
        return responseData;
    }

    return {
        getRequest,
        postRequest,
        putRequest,
        deleteRequest,
        patchRequest,
        errorResponseAPI
    };
}

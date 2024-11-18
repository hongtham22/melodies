// src/utils/apiService.ts
import envConfigModel from '@/configModel';

const API_BASE_URL = envConfigModel.NEXT_PUBLIC_API_AI;

export const fetchApiData = async (endpoint, method, body, token, params) => {
    let url = `${API_BASE_URL}${endpoint}`;

    const urlParams = new URLSearchParams();
    if (params) {
        Object.keys(params).forEach(key => {
            if (params[key] !== undefined && params[key] !== null) {
                urlParams.append(key, params[key]);
            }
        });
    }
    if (urlParams.toString()) {
        url += `?${urlParams.toString()}`;
    }

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };

    const options = {
        method,
        headers,
        ...(body && { body }),
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
            return { success: true, data };
        } else {
            return { success: false, error: data.message || "Network response was not ok" };
        }
    } catch (error) {
        return { success: false, error: (error).message || "An unexpected error occurred" };
    }
};
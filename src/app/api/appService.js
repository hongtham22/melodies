// src/utils/apiService.ts
import envConfig from "@/config";

const API_BASE_URL = envConfig.NEXT_PUBLIC_API_ENDPOINT;

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

  if (body instanceof FormData) {
    delete headers['Content-Type'];
  } else {
    headers['Content-Type'] = 'application/json';
  }

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
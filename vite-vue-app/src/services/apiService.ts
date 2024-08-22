import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useUserStore } from '../stores/userStore'; // Adjust the import based on your auth store location
import { useRouter } from "vue-router";

class apiService {
    private axiosInstance: AxiosInstance;
    private authStore = useUserStore(); 

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL: baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.initializeRequestInterceptor();
        this.initializeResponseInterceptor();
    }

    private initializeRequestInterceptor() {
        this.axiosInstance.interceptors.request.use(
            (request) => {
                const token = this.authStore.getAccessToken;
                if (token) {
                    request.headers.Authorization = `Bearer ${token}`;
                }
                return request;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    private initializeResponseInterceptor() {
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                const originalRequest = error.config;
                const router = useRouter();
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    this.authStore.setAccessToken('');
                    this.authStore.setRefreshToken('');
                    router.push('/login'); // Redirect to login page
                }

                return Promise.reject(error);
            }
        );
    }

    private handleResponse(response: AxiosResponse) {
        return response.data;
    }

    private handleError(error: any) {
        return Promise.reject(error.response || error.message);
    }

    public async request(method: string, url: string, options: AxiosRequestConfig = {}): Promise<any> {
        try {
            const response = await this.axiosInstance.request({
                method,
                url,
                ...options,
            });
            return this.handleResponse(response);
        } catch (error) {
            return this.handleError(error);
        }
    }

    public async get(url: string, options: AxiosRequestConfig = {}): Promise<any> {
        return this.request('GET', url, options);
    }

    public async post(url: string, data: Object, options: AxiosRequestConfig = {}): Promise<any> {
        return this.request('POST', url, { ...options, data });
    }

    public async put(url: string, data: Object, options: AxiosRequestConfig = {}): Promise<any> {
        return this.request('PUT', url, { ...options, data });
    }

    public async delete(url: string, options: AxiosRequestConfig = {}): Promise<any> {
        return this.request('DELETE', url, options);
    }
}

export default apiService;
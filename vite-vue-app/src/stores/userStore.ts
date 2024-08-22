import { defineStore } from 'pinia';

export interface user {
    id: number
    firstName: string;
    lastName: string;
    email: string;
}

export const useUserStore = defineStore('user', {
    state: () => ({
        user: Array<user>(),
        accessToken: '',
        refreshToken: '',
        isAuthenticated: false,
    }),
    actions: {
        setAccessToken(token: string) {
            this.accessToken = token;
            this.isAuthenticated = !!token;
        },
        setRefreshToken(token: string) {
            this.refreshToken = token;
        },
        clearTokens() {
            this.accessToken = '';
            this.refreshToken = '';
            this.isAuthenticated = false;
        },
    },
    getters: {
        getUser: (state) => state.user,
        getAccessToken: (state) => state.accessToken,
        getRefreshToken: (state) => state.refreshToken,
    },
});

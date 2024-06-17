import { defineStore } from 'pinia';

interface IAuthStoreState {
    accessToken: string;
    refreshToken: string;
    userId: string;

    isDoingLogin: boolean;
    isLogged: boolean;
}

export const useAuthStore = defineStore('authStore', {
    state: (): IAuthStoreState => ({
        accessToken: "",
        refreshToken: "",
        userId: "",

        isDoingLogin: false,
        isLogged: false,
    }),

    getters: {
    },

    actions: {
        async dispatchLogin(username: string, password: string) {
            console.log("sale")
            this.isDoingLogin = true

            // If the user was Logged, log him out and back in to clean refresh tokens
            let oldRefreshToken = localStorage.getItem('prodeRefreshToken');
            if (oldRefreshToken != undefined) await $fetch("/api/logout", { method: 'delete', body: { token: localStorage.getItem('prodeRefreshToken') } });

            try {
                const response: any = await $fetch("/api/login", { method: 'post', body: { username, password } });

                console.log("response", response)

                localStorage.setItem('prodeAccessToken', response.accessToken);
                this.accessToken = response.accessToken;

                localStorage.setItem('prodeRefreshToken', response.refreshToken);
                this.refreshToken = response.refreshToken;

                this.userId = response.userId;

                this.isLogged = true
            } catch (error: any) {
                switch (error.response?.status) {
                    case 404:
                        throw { nombreError: true }
                    case 401:
                        throw { passwordError: true }
                    default:
                        console.log(error)
                        // dispatch('ABRIR_ERROR', error.response.message);
                        break;
                }
            } finally {
                console.log("sale")
                this.isDoingLogin = false
            }
        },
    }
});
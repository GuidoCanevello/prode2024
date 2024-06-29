import { defineStore } from 'pinia';

interface IAuthStoreState {
    accessToken: string;
    refreshToken: string;
    userId: TMongoID;

    isDoingLogin: boolean;
    isDoingLogout: boolean;
    isLogged: boolean;
}

export const useAuthStore = defineStore('authStore', {
    state: (): IAuthStoreState => ({
        accessToken: "",
        refreshToken: "",
        userId: "",

        isDoingLogin: false,
        isDoingLogout: false,
        isLogged: false,
        // TODO agregar arreglo de arrow Functions que se ejecuten una vez que el usuario se conecta
    }),

    getters: {
        hasSavedLogin(): boolean {
            return localStorage.getItem('prodeLoginDataU') != undefined && localStorage.getItem('prodeLoginDataP') != undefined;
        }
    },

    actions: {
        async dispatchLogin(username: string, password: string, isSaveLogin?: boolean) {
            this.isDoingLogin = true

            // If the user was Logged in, log him out and back in to clean refresh tokens
            const oldRefreshToken = localStorage.getItem('prodeRefreshToken');
            if (oldRefreshToken != undefined) await $fetch("/api/logout", { method: 'delete', body: { token: oldRefreshToken } });

            try {
                const response: any = await $fetch("/api/login", { method: 'post', body: { username, password } });

                if (isSaveLogin) {
                    localStorage.setItem('prodeLoginDataU', username);
                    localStorage.setItem('prodeLoginDataP', password);
                }

                localStorage.setItem('prodeAccessToken', response.accessToken);
                this.accessToken = response.accessToken;

                localStorage.setItem('prodeRefreshToken', response.refreshToken);
                this.refreshToken = response.refreshToken;

                this.userId = response.userId;
               
                this.isLogged = true;
                
                await useUserStore().dispatchGetInitialData();
            } catch (error: any) {
                switch (error.statusCode) {
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
                this.isDoingLogin = false
            }
        },

        async dispatchRefreshToken() {
            try {
                const refreshToken = localStorage.getItem('prodeRefreshToken');
                const response = await $fetch("/api/token", { method: "post", body: { token: refreshToken } }) as any;

                if (response.accessToken == undefined) throw new Error('Access token is undefined');

                localStorage.setItem('prodeAccessToken', response.accessToken);
                this.accessToken = response.accessToken;
                this.isLogged = true;
            } catch (error: any) {
                switch (error.statusCode) {
                    case 403:
                    case 401:
                        this.isLogged = false;
                        break;
                    default:
                        throw error;
                }
            }
        },

        async dispatchLogout() {
            this.isDoingLogout = true

            try {
                const oldRefreshToken = localStorage.getItem('prodeRefreshToken');

                if (oldRefreshToken != undefined) await $fetch("/api/logout", { method: 'delete', body: { token: oldRefreshToken } });
            } catch (error: any) {
                switch (error.statusCode) {
                    default:
                        console.log(error)
                        // dispatch('ABRIR_ERROR', error.response.message);
                        break;
                }
            }

            this.userId = "";

            this.isLogged = false;

            localStorage.removeItem('prodeAccessToken');
            localStorage.removeItem('prodeRefreshToken');
            localStorage.removeItem('prodeLoginDataU');
            localStorage.removeItem('prodeLoginDataP');

            useUserStore().removeUserData();

            this.isDoingLogout = false
        }
    }
});
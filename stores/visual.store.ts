import { defineStore } from 'pinia';

interface IVisualStoreState {
    showSnackbar: boolean;
}

export const useVisualStore = defineStore('visualStore', {
    state: (): IVisualStoreState => ({
        showSnackbar: false,
    }),

    getters: {
        // hasSavedLogin(): boolean {
        //     return localStorage.getItem('prodeLoginDataU') != undefined && localStorage.getItem('prodeLoginDataP') != undefined;
        // }
    },

    actions: {
        doShowSnackbar() {
            this.showSnackbar = true;
        },
    }
});
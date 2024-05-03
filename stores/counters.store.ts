// TODO borrar cuando ya tenga otra store lista, la dejo a modo de ejemplo
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('others-counterStore', {
    state: () => ({
        counter: 0,
    }),

    getters: {
        doubleCounter: state => {
            return state.counter * 2;
        },
    },

    actions: {
        addOne() {
            this.counter++;
        },

        addValue(value: number) {
            this.counter += value;
        }
    }
})
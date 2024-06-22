<script setup lang="ts">
const emit = defineEmits(['onClose'])

const { isGettingData } = storeToRefs(useUserStore());

const isValid = ref(true);
const form = ref<any>(null);

const userName = ref("");
const userNameRules = ref([(value: any) => !!value || "Debe ingresar un Nombre de Usuario"]);
const isUserNameError = ref(false);
const msgUserNameError = ref("");

const userPassword = ref("");
const passwordRules = ref([(value: any) => !!value || "Debe ingresar una Contraseña"]);
const isPasswordError = ref(false);
const msgPasswordError = ref("");

const isSaveLogin = ref(false);

function handleSubmit() {
    if (form.value?.validate()) {
        useAuthStore()
            .dispatchLogin(userName.value, userPassword.value, isSaveLogin.value)
            .then((e) => {
                emit('onClose')
            })
            .catch((e) => {
                console.log("catch", e)
                if (e.nombreError) {
                    isUserNameError.value = true;
                    msgUserNameError.value = "Usuario no Valido";
                } else if (e.passwordError) {
                    isPasswordError.value = true;
                    msgPasswordError.value = "Contraseña Incorrecta";
                    userPassword.value = "";
                }
            });
    }
}

function resetValidacion() {
    isUserNameError.value = false;
    msgUserNameError.value = "";

    isPasswordError.value = false;
    msgPasswordError.value = "";
    form.value?.resetValidation();
}
</script>

<template>
    <v-card class="main-card">
        <v-container>
            <v-card-title primary-title>
                Login
            </v-card-title>

            <v-form ref="form" v-model="isValid" lazy-validation @submit.prevent="handleSubmit">
                <v-card-text class="pt-4">
                    <v-text-field v-model="userName" label="Nombre de Usuario" prepend-icon="mdi-account-outline"
                        variant="outlined" required :rules="userNameRules" :error="isUserNameError"
                        :error-messages="msgUserNameError" :disabled="isGettingData" @focus="resetValidacion" />

                    <v-text-field v-model="userPassword" label="Contraseña" type="password" prepend-icon="mdi-lock"
                        variant="outlined" required :rules="passwordRules" :error="isPasswordError"
                        :error-messages="msgPasswordError" :disabled="isGettingData" @focus="resetValidacion" />

                    <v-checkbox v-model="isSaveLogin" label="Mantener la cuenta iniciada" />
                </v-card-text>

                <v-card-actions>
                    <v-row>
                        <v-spacer />

                        <v-col cols="auto">
                            <v-btn color="error" :disabled="isGettingData" :loading="isGettingData" variant="outlined"
                                @click="$emit('onClose')">
                                Cerrar
                            </v-btn>
                        </v-col>

                        <v-col cols="auto">
                            <v-btn color="success" type="submit" :disabled="isGettingData" :loading="isGettingData"
                                variant="outlined">
                                Ingresar
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-form>

        </v-container>
    </v-card>
</template>

<style scoped>
.main-card {
    width: 30rem;
    flex-direction: column;
    align-content: center;
}

@media (max-width: 600px) {
    .main-card {
        width: auto;
    }
}
</style>
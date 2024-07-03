<script setup lang="ts">
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-container grid-list-xs>
            <h1>Backend</h1>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-container class="ml-0 px-0">
          <backend-create-user-card />
        </v-container>

        <v-container class="ml-0 px-0">
          <backend-set-score-card />
        </v-container>

        <v-container class="ml-0 px-0">
          <backend-set-score-final-card />
        </v-container>

        <v-container class="ml-0 px-0">
          <backend-set-fecha-final-card />
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

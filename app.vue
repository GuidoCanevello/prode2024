<script setup lang="ts">
</script>

<template>
  <NuxtLayout>
    <v-container>
      <UnderConstructionCard />
    </v-container>

    <v-container>
      <v-card>
        <v-card-text>
          <v-row>
            <v-col>
              <v-card color="primary-darken-1">
                <v-container grid-list-xs>
                  <v-card color="primary">
                    <v-container grid-list-xs />
                  </v-card>
                </v-container>
              </v-card>
            </v-col>

            <v-col>
              <v-card color="secondary-darken-1">
                <v-container grid-list-xs>
                  <v-card color="secondary">
                    <v-container grid-list-xs />
                  </v-card>
                </v-container>
              </v-card>
            </v-col>

            <v-col>
              <v-card color="background">
                <v-container grid-list-xs />
              </v-card>
            </v-col>

            <v-col>
              <v-card color="surface">
                <v-container grid-list-xs />
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-btn color="success">text</v-btn>
            </v-col>

            <v-col>
              <v-btn color="error">text</v-btn>
            </v-col>

            <v-col>
              <v-btn color="info">text</v-btn>
            </v-col>

            <v-col>
              <v-btn color="warning">text</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </NuxtLayout>
</template>

<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card elevation="4" class="pa-6">
          <v-card-title class="text-h5 mb-4">Register</v-card-title>
          <v-form @submit.prevent="onRegister">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              required
              prepend-inner-icon="mdi-email"
            />
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
              prepend-inner-icon="mdi-lock"
            />
            <v-btn type="submit" color="primary" block class="mt-4">
              Register
            </v-btn>
          </v-form>
          <v-card-text class="mt-3 text-center">
            Already have an account?
            <NuxtLink to="/login">Login</NuxtLink>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const onRegister = () => {
  alert(`Registering with email: ${email.value}`)
}
</script>

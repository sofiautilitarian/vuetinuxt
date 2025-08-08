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
            <v-btn type="submit" color="primary" block class="mt-4" :loading="loading">
              Register
            </v-btn>
          </v-form>
          <v-card-text class="mt-3 text-center">
            Already have an account?
            <NuxtLink to="/login">Login</NuxtLink>
          </v-card-text>
          <v-alert v-if="errorMessage" type="error" class="mt-3">
            {{ errorMessage }}
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface ApiResponse {
  success: boolean
  message: string
  id?: string
}

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref<string | null>(null)
const router = useRouter()

const onRegister = async () => {
  errorMessage.value = null

  if (!email.value || !password.value) {
    errorMessage.value = 'Email and password are required.'
    return
  }

  loading.value = true
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const response: ApiResponse = await res.json()

    if (response.success) {
      alert(response.message)
      router.push('/login')
    } else {
      errorMessage.value = response.message
    }
  } catch (err: any) {
    errorMessage.value = err.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

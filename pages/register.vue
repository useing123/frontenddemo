<template>
  <div class="flex flex-col items-center">
    <h1 class="text-3xl font-bold mb-4">Register</h1>
    <form class="flex flex-col mt-4 w-full md:w-1/3" @submit.prevent="registerUser">
      <label class="text-lg font-semibold mb-2" for="email">Email:</label>
      <input
        id="email"
        v-model="email"
        class="p-2 rounded-lg border border-gray-300"
        type="email"
        required
      />
      <p v-if="!validEmail" class="text-red-500">Invalid email</p>

      <label class="text-lg font-semibold mb-2 mt-4" for="password">Password:</label>
      <input
        id="password"
        v-model="password"
        class="p-2 rounded-lg border border-gray-300"
        type="password"
        required
      />

      <label class="text-lg font-semibold mb-2 mt-4" for="confirm-password">Confirm Password:</label>
      <input
        id="confirm-password"
        v-model="confirmPassword"
        class="p-2 rounded-lg border border-gray-300"
        type="password"
        required
      />
      <p v-if="password !== confirmPassword" class="text-red-500">Passwords do not match</p>

      <button
        :disabled="!validEmail || password !== confirmPassword || !password"
        class="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
      >
        Register
      </button>

      <button
        @click.prevent="$router.push('/login')"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
      >
        Already have an account? Login
      </button>

      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>

      <div class="mt-4">
        <p>Or register with:</p>
        <button class="">Google</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      error: ''
    };
  },
  computed: {
    validEmail() {
      // Basic email validation with regex
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.email.toLowerCase());
    }
  },
  methods: {
    async registerUser() {
      // Only proceed if email is valid and passwords match
      if (this.validEmail && this.password === this.confirmPassword) {
        this.error = '';
        try {
          const response = await axios.post('https://fastapi-9a00.onrender.com/auth/users', {
            email: this.email,
            password: this.password,
          });
  
          if (response.data.email) {
            console.log('User registered successfully!');
            this.$router.push('/login');
          } else {
            this.error = 'Error registering user: ' + response.data.detail;
          }
        } catch (error) {
          this.error = 'Error registering user: ' + error;
        }
      }
    },
  },
};
</script>

<style>
/* Adjust the form width for smaller screens */
@media (max-width: 768px) {
  form {
    width: 90%;
  }
}
</style>

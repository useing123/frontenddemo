<template>
    <div class="flex flex-col items-center">
      <h1 class="text-3xl font-bold mb-4">Register</h1>
      <form class="flex flex-col mt-4 w-1/3">
        <label class="text-lg font-semibold mb-2" for="email">Email:</label>
        <input
          id="email"
          v-model="email"
          class="p-2 rounded-lg border border-gray-300"
          type="email"
          required
        />
  
        <label class="text-lg font-semibold mb-2 mt-4" for="password"
          >Password:</label
        >
        <input
          id="password"
          v-model="password"
          class="p-2 rounded-lg border border-gray-300"
          type="password"
          required
        />
  
        <button
          @click.prevent="registerUser"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          Register
        </button>
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
      };
    },
    methods: {
      async registerUser() {
        try {
          const response = await axios.post('https://fastapi-9a00.onrender.com/auth/users', {
            email: this.email,
            password: this.password,
          });
  
          if (response.data.email) {
            console.log('User registered successfully!');
            this.$router.push('/login');
          } else {
            console.error('Error registering user:', response.data.detail);
          }
        } catch (error) {
          console.error('Error registering user:', error);
        }
      },
    },
  };
  </script>
  
  <style>
  @import "@/assets/css/apple-style.css";
  </style>
  
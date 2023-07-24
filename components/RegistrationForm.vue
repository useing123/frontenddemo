<template>
    <div class="registration-form">
      <h2 class="text-3xl font-semibold text-black mb-6">
        Ready to watch? Enter your email to create or restart your membership.
      </h2>
      <form class="flex flex-col">
        <label class="text-lg font-semibold mb-2 text-white" for="email"></label>
        <input
          id="email"
          v-model="email"
          class="p-3 rounded-lg border border-gray-300"
          type="email"
          required
          placeholder="Enter your email address"
        />
        <button @click.prevent="registerUser" class="bg-red-600 text-white px-6 py-3 rounded-lg mt-8">
          Start Watching
        </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
      };
    },
    methods: {
      registerUser() {
        // Your registration logic here
      },
    },
  };
  </script>
  
  <style>
  /* RegistrationForm styles go here */
  </style>
  
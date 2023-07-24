<template>
  <div class="flex flex-col items-center">
    <h1 class="text-3xl font-bold mb-4">Login</h1>
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
        @click.prevent="loginUser"
        class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
      >
        Login
      </button>
    </form>
  </div>
</template>
  
  <script>
import axios from "axios";
import qs from "qs"; // You might need to install this package

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async loginUser() {
      try {
        const data = qs.stringify({
          grant_type: "",
          username: this.email,
          password: this.password,
          scope: "",
          client_id: "",
          client_secret: "",
        });

        const config = {
          method: "post",
          url: "https://fastapi-9a00.onrender.com/auth/users/tokens",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: data,
        };

        const response = await axios(config);

        if (response.data.access_token) {
          // Store the JWT in local storage
          localStorage.setItem("jwt", response.data.access_token);
          console.log("User logged in successfully!");
          this.$router.push("/generated-content");
        } else {
          console.error("Error logging in:", response.data.detail);
        }
      } catch (error) {
        console.error("Error logging in:", error);
      }
    },
  },
};
</script>
  
  <style>
@import "@/assets/css/apple-style.css";
/* Add your custom styles here */
</style>
  
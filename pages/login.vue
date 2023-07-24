<template>
  <div class="app-container">
    <div class="main-content">
      <h1 class="text-3xl font-bold mb-4">Login</h1>
      <form class="flex flex-col mt-4 w-full md:w-1/3" @submit.prevent="loginUser">
        <label class="text-lg font-semibold mb-2" for="email">Email:</label>
        <input
          id="email"
          v-model="email"
          class="p-2 rounded-lg border border-gray-300"
          type="email"
          required
        />

        <label class="text-lg font-semibold mb-2 mt-4" for="password">Password:</label>
        <input
          id="password"
          v-model="password"
          class="p-2 rounded-lg border border-gray-300"
          type="password"
          required
        />

        <button
          :disabled="!email || !password"
          class="bg-red-600 text-white px-6 py-3 rounded-lg mt-8"
        >
          Login
        </button>

        <button
          @click.prevent="$router.push('/register')"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          No account? Register
        </button>

        <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
      </form>
    </div>
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
      error: ""
    };
  },
  methods: {
    async loginUser() {
      this.error = "";
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
          this.$router.push("/dashboard");
        } else {
          this.error = "Error logging in: " + response.data.detail;
        }
      } catch (error) {
        this.error = "Error logging in: " + error;
      }
    },
  },
};
</script>

<style scoped>
.app-container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #141414;
  box-sizing: border-box;
}

.main-content {
  width: 100%;
  max-width: 500px; /* Optional: Add a max-width to the main content if you want to limit its width */
  text-align: center;
}

/* Additional styles for other elements can be added here if needed */
</style>

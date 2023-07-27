<template>
  <div class="app-container">
    <div class="main-content flex flex-col items-center">
      <h1 class="text-3xl font-semibold text-white mb-4">Register</h1>
      <form class="form-container flex flex-col" @submit.prevent="registerUser">
        <label class="text-lg font-semibold mb-2" for="email">Email:</label>
        <input
          id="email"
          v-model="email"
          class="input-field"
          type="email"
          @input="validateEmail"
          required
          placeholder="Email address"
        />
        <p v-if="!validEmail && email" class="text-red-500">Invalid email</p>

        <label class="text-lg font-semibold mb-2 mt-4" for="password">Password:</label>
        <input
          id="password"
          v-model="password"
          class="input-field"
          type="password"
          required
          placeholder="Enter password"
        />

        <label class="text-lg font-semibold mb-2 mt-4" for="confirm-password">Confirm Password:</label>
        <input
          id="confirm-password"
          v-model="confirmPassword"
          class="input-field"
          type="password"
          required
          placeholder="Enter password"
        />
        <p v-if="password !== confirmPassword" class="text-red-500">Passwords do not match</p>

        <button
          :disabled="loading || !validEmail || password !== confirmPassword || !password"
          class="bg-red-600 text-white px-6 py-3 rounded-lg mt-8"
        >
          {{ loading ? 'Registering...' : 'Register' }}
        </button>

        <button
          @click.prevent="$router.push('/login')"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          Already have an account? Login
        </button>

        <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>

        <div class="mt-4">
          <p class="text-white">Or register with:</p>
          <button class="submit-button mt-4">Google</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "@nuxtjs/axios";
import qs from "qs";

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
      loading: false,
    };
  },
  computed: {
    validEmail() {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.email.toLowerCase());
    },
  },
  methods: {
    async registerUser() {
      if (this.validEmail && this.password === this.confirmPassword) {
        this.error = "";
        this.loading = true;
        try {
          const response = await this.$axios.post("/auth/users", {
            email: this.email,
            password: this.password,
          });

          this.loading = false;

          if (response.data.email) {
            console.log("User registered successfully!");

            // Auto-login the user after registration
            this.autoLogin();
          } else {
            this.error = "Error registering user: " + response.data.detail;
          }
        } catch (error) {
          this.loading = false;
          this.error = "Error registering user: " + error;
        }
      }
    },
    validateEmail() {
      this.error = "";
    },
    async autoLogin() {
      try {
        const data = qs.stringify({
          grant_type: "",
          username: this.email,
          password: this.password,
          scope: "",
          client_id: "",
          client_secret: "",
        });

        const response = await this.$axios.post("/auth/users/tokens", data);

        if (response.data.access_token) {
          // Store the JWT in cookies
          this.$cookies.set("jwt", response.data.access_token);
          console.log("User logged in successfully!");
          this.$router.push("/dashboard"); // Redirect to the authenticated route
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
  padding: 1rem;
  min-height: 100vh; 
  width: 100%; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #141414;
  box-sizing: border-box; 
}

.main-content {
  width: 100%; 
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-container {
  width: 100%;
  max-width: 500px;
}

.input-field {
  color: #000;
  padding: 0.5rem;
  border: none;
  background-color: #ffffff;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.submit-button {
  color: #fff;
  background-color: #e50914;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.5s ease;
}

.submit-button:hover {
  background-color: #f40612;
}
</style>

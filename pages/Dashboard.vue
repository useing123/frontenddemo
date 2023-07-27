<template>
  <div class="dashboard flex flex-col items-center">
    <h1 class="text-3xl font-bold mb-4 text-white">Personal Cabinet</h1>
    <div v-if="user" class="profile p-4 mb-4 bg-gray-800 rounded-lg shadow-md text-white w-2/3">
      <h2 class="text-xl font-semibold mb-2">User Profile</h2>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <!-- Display other profile information here -->
    </div>
    <div v-else-if="loading" class="text-white">
      Loading user profile...
    </div>
    <div v-else>
      <p class="text-red-500">User not authenticated. Please login.</p>
      <router-link to="/login" class="text-white underline">Go to login</router-link>
    </div>
    <button v-if="user" @click="logout" class="logout-btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg mt-4">Logout</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: null,
      loading: false, // New data property to handle loading state
    };
  },
  async mounted() {
    await this.fetchUserDataFromServer();
  },
  methods: {
    async fetchUserDataFromServer() {
      const jwt = this.$cookies.get('jwt'); // Fetch JWT from cookies

      if (jwt) {
        try {
          this.loading = true;
          const response = await axios.get('https://fastapi-9a00.onrender.com/auth/users/me', {
            headers: {
              'Authorization': `Bearer ${jwt}`,
            },
          });

          this.user = response.data;
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Handle the error, e.g., redirect to login page
          this.$router.push("/login");
        } finally {
          this.loading = false;
        }
      } else {
        // If JWT is missing, redirect to login page
        this.$router.push("/login");
      }
    },
    logout() {
      // Perform logout actions, e.g., clear token from cookies
      this.$cookies.remove("jwt");
      this.user = null;
      this.$router.push("/login"); // Redirect to the login page after logout
    },
  },
};
</script>

<style scoped>
.dashboard {
  color: #fff;
  padding: 1rem;
}

.profile {
  color: #fff;
}

.logout-btn {
  color: #fff;
}

.text-red-500 {
  color: #ff0000;
  font-size: 14px;
  margin-top: 0.5rem;
}

/* Responsive Design */
@media screen and (min-width: 768px) {
  .dashboard {
    max-width: 768px;
    margin: 0 auto;
  }
}
</style>

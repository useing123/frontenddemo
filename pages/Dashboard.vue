<template>
  <div class="dashboard flex flex-col items-center">
    <h1 class="text-3xl font-bold mb-4 text-white">Personal Cabinet</h1>
    <div v-if="user" class="profile p-4 mb-4 bg-gray-800 rounded-lg shadow-md text-white w-2/3">
      <h2 class="text-xl font-semibold mb-2">User Profile</h2>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <!-- Display other profile information here -->
    </div>
    <div v-else class="text-white">
      Loading user profile...
    </div>
    <button @click="logout" class="logout-btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Logout</button>
  </div>
</template>

<!-- Place the same script here -->


  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: null,
      };
    },
    async mounted() {
      try {
        // Fetch user data from the server (replace this with your actual API call)
        const userData = await this.fetchUserDataFromServer();
  
        // Set the fetched data to the user property
        this.user = userData;
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    methods: {
      async fetchUserDataFromServer() {
        const jwt = localStorage.getItem('jwt'); // Assuming you have stored the JWT in local storage
  
        const response = await axios.get('https://fastapi-9a00.onrender.com/auth/users/me', {
          headers: {
            'Authorization': `Bearer ${jwt}`,
          },
        });
  
        return response.data;
      },
      logout() {
        // Perform logout actions, e.g., clear token from local storage
        // For example: localStorage.removeItem("jwt");
        this.$router.push("/login"); // Redirect to the login page after logout
      },
    },
  };
  </script>

<style scoped>
.dashboard {
color: #fff;
}

.profile {
color: #fff;
}

.logout-btn {
color: #fff;
}
</style>
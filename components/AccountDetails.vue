<template>
  <div class="account-details bg-gray-800 text-white rounded-lg p-6 shadow-lg">
    <h1 class="account-header text-3xl font-bold mb-4">Account Details</h1>
    <div v-if="user">
      <p class="text-lg"><strong>Name:</strong> {{ user.name }}</p>
      <p class="text-lg"><strong>Email:</strong> {{ user.email }}</p>
    </div>
    <div v-else-if="loading">
      Loading account details...
    </div>
    <div v-else>
      Error loading account details.
      <button @click="fetchUserDataFromServer" class="retry-btn bg-red-500 text-white rounded px-4 py-2 mt-4">Try Again</button>
    </div>
    <button @click="logout" class="logout-btn bg-red-500 text-white rounded px-4 py-2 mt-4">Logout</button>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: null,
        loading: false,
      };
    },
    async created() {
      await this.fetchUserDataFromServer();
    },
    methods: {
      async fetchUserDataFromServer() {
        this.loading = true;
  
        const jwt = this.$cookies.get('jwt');
  
        if (jwt) {
          try {
            const response = await axios.get('https://fastapi-9a00.onrender.com/auth/users/me', {
              headers: {
                'Authorization': `Bearer ${jwt}`,
              },
            });
  
            this.user = response.data;
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
  
          this.loading = false;
        }
      },
      logout() {
        this.$cookies.remove("jwt");
        this.user = null;
        this.$router.push("/login");
      },
    },
  };
  </script>
  
<style scoped>
  /* Adjust styles here */
  .account-details {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
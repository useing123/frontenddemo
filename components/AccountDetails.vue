<template>
    <div class="account-details">
      <h1 class="account-header">Account Details</h1>
      <div v-if="user">
        <p><strong>Name:</strong> {{ user.name }}</p>
        <!-- <p><strong>Surname:</strong>{{  }} </p> -->
        <p><strong>Email:</strong> {{ user.email }}</p>
      </div>
      <div v-else-if="loading">
        Loading account details...
      </div>
      <div v-else>
        Error loading account details.
        <button @click="fetchUserDataFromServer">Try Again</button>
      </div>
      <button @click="logout" class="logout-btn">Logout</button>
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
  .account-details {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .account-header {
    font-size: 2em;
    margin-bottom: 1rem;
  }
  
  .logout-btn {
    padding: 0.5rem;
    font-size: 1em;
  }
  </style>
  
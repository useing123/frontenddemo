<template>
    <div class="update-account">
      <h1 class="account-header">Update Account</h1>
      <form @submit.prevent="updateUserData" v-if="user">
        <label>Name:</label>
        <input v-model="user.name" type="text" />
  
        <label>Email:</label>
        <input v-model="user.email" type="email" />
  
        <button type="submit">Update</button>
      </form>
      <div v-else-if="loading">
        Loading account details...
      </div>
      <div v-else>
        Error loading account details.
        <button @click="fetchUserDataFromServer">Try Again</button>
      </div>
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
      async updateUserData() {
        const jwt = this.$cookies.get('jwt');
  
        if (jwt && this.user) {
          try {
            this.loading = true;
  
            const response = await axios.put('https://fastapi-9a00.onrender.com/auth/users/me', this.user, {
              headers: {
                'Authorization': `Bearer ${jwt}`,
              },
            });
  
            this.user = response.data;
          } catch (error) {
            console.error("Error updating user data:", error);
          }
  
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .update-account {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .account-header {
    font-size: 2em;
    margin-bottom: 1rem;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  input {
    margin-bottom: 1rem;
  }
  </style>
  
<template>
  <div class="update-account bg-gray-800 text-white rounded-lg p-6 shadow-lg">
    <h1 class="account-header text-3xl font-bold mb-4">Update Account</h1>
    <div v-if="user">
      <p class="text-lg"><strong>Name:</strong> <input v-model="user.name" type="text" :readonly="!editing" class="input-field" /></p>
      <p class="text-lg"><strong>Email:</strong> <input v-model="user.email" type="email" :readonly="!editing" class="input-field" /></p>
      <button @click="editing = !editing" class="edit-btn bg-red-500 text-white rounded px-4 py-2 mt-4">{{ editing ? 'Save' : 'Edit' }}</button>
    </div>
    <div v-else-if="loading">
      Loading account details...
    </div>
    <div v-else>
      Error loading account details.
      <button @click="fetchUserDataFromServer" class="retry-btn bg-red-500 text-white rounded px-4 py-2 mt-4">Try Again</button>
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
        editing: false,
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
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input-field {
    border: none;
    background-color: #2d2d2d;
    color: #fff;
    padding: 0.5em;
    border-radius: 0.25em;
    margin-top: 0.5em;
    width: 100%;
  }
</style>

<template>
  <div class="registration-form text-white p-6 rounded-lg">
    <h2 class="text-3xl font-semibold mb-6">
      Are you ready to create your own manga? Register now by entering your email to get started!
    </h2>
    <form class="flex flex-col">
      <input
        id="email"
        v-model="email"
        class="form-input p-3 rounded-lg mb-4"
        type="email"
        required
        placeholder="Email address"
      />
      <button @click.prevent="registerUser" class="form-button py-3 rounded-lg text-lg font-bold">
        Get Started 
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
      this.$cookies.set('user_email', this.email, {
        maxAge: 60 * 60 * 24 * 7, // Set the cookie to last for 1 week (in seconds)
      });
      this.$router.push({ name: 'register' });
    },
  },
};
</script>

<style scoped>
.registration-form {
  max-width: 500px;
  margin: 0 auto;
}

.form-input {
  background-color: rgb(23, 23, 23);
  color: white;
  border: #e50914 1px solid;
  font-size: 1rem;
  padding: 0.5rem;
}

.form-button {
  background-color: #e50914;
  color: white;
  cursor: pointer;
  transition: background-color 0.5s ease;
}

.form-button:hover {
  background-color: #f40612;
}
</style>

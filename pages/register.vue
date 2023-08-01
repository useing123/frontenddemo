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
          placeholder="Confirm password"
        />
        <p v-if="password !== confirmPassword" class="text-red-500">Passwords do not match</p>

        <button
          :disabled="loading || !validEmail || password !== confirmPassword || !password"
          class="submit-button mt-8"
        >
          {{ loading ? 'Registering...' : 'Register' }}
        </button>

        <button
          @click.prevent="$router.push('/login')"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          Already have an account? Login
        </button>

        <p v-if="error" class="text-red-500 mt-4">Registration Error: {{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import qs from 'qs';

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
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
        this.error = '';
        this.loading = true;
        try {
          const response = await this.$axios.post('/auth/users', {
            email: this.email,
            password: this.password,
          });

          this.loading = false;

          if (response.data.email) {
            console.log('User registered successfully!');

            // Auto-login the user after registration
            await this.autoLogin();

            // Clear form fields after successful registration
            this.email = '';
            this.password = '';
            this.confirmPassword = '';
          } else {
            this.error = 'Error registering user: ' + response.data.detail;
          }
        } catch (error) {
          this.loading = false;
          this.error = 'Error registering user: ' + error;
        }
      }
    },
    validateEmail() {
      this.error = '';
    },
    async autoLogin() {
      try {
        const data = qs.stringify({
          grant_type: 'password',
          username: this.email,
          password: this.password,
          scope: '', // your application scope
          client_id: '', // your client id
          client_secret: '', // your client secret
        });

        const response = await this.$axios.post('/auth/users/tokens', data);

        if (response.data.access_token) {
          // Store the JWT in cookies
          this.$cookies.set('jwt', response.data.access_token, {
            maxAge: 60 * 60 * 24 * 1, // Set the cookie to last for 1 day (in seconds)
          });
          console.log('User logged in successfully!');
          this.$router.push('/account'); // Redirect to the authenticated route
        } else {
          this.error = 'Error logging in: ' + response.data.detail;
        }
      } catch (error) {
        this.error = 'Error logging in: ' + error;
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

/* Responsive Design */
@media screen and (max-width: 600px) {
  .form-container {
    max-width: 100%;
  }
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

/* Additional styles for error message */
.text-red-500 {
  color: #ff0000;
  font-size: 14px;
  margin-top: 0.5rem;
}
</style>

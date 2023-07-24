<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Profile Account</h1>
    <div class="profile-info">
      <div class="profile-field">
        <span class="field-name">Username:</span>
        <span class="field-value">{{ user.username }}</span>
      </div>
      <div class="profile-field">
        <span class="field-name">Email:</span>
        <span class="field-value">{{ user.email }}</span>
      </div>
      <!-- Add other user account fields here -->
    </div>
    <h2 class="text-xl font-bold mt-8 mb-4">Generated Content</h2>
    <div v-if="generatedContent.length > 0">
      <!-- Display the user's generated manga content here -->
      <div
        v-for="content in generatedContent"
        :key="content.manga_id"
        class="generated-content"
      >
        <h3 class="text-lg font-bold">{{ content.title }}</h3>
        <!-- Add other generated content details here -->
        <p>{{ content.manga_chapters_story }}</p>
      </div>
    </div>
    <div v-else>
      <p>No generated content available.</p>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        // Add other user account data here
      },
      generatedContent: [],
    };
  },
  async mounted() {
    try {
      // Fetch the user's account information from the API based on their ID (64acf59fec98123e377f901c)
      const userId = "64acf59fec98123e377f901c"; // Replace this with the actual user ID
      const userResponse = await fetchUserAccount(userId); // Replace fetchUserAccount with your API call to fetch the user's account data
      this.user = userResponse.data; // Update the user data with the fetched response

      // Fetch the user's generated content from the API based on their ID (64acf59fec98123e377f901c)
      const generatedContentResponse = await fetchGeneratedContent(userId); // Replace fetchGeneratedContent with your API call to fetch the user's generated content
      this.generatedContent = generatedContentResponse.data; // Update the generatedContent array with the fetched response
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle the error and display an appropriate message to the user
    }
  },
  methods: {
    async fetchUserAccount(userId) {
      // Implement your API call here to fetch the user's account information based on their ID
      // Example: You can use the Axios library to make a GET request to your backend API.
      // Replace the following line with your actual API call:
      return await axios.get(`/api/users/${userId}`);
    },
    async fetchGeneratedContent(userId) {
      // Implement your API call here to fetch the user's generated content based on their ID
      // Example: You can use the Axios library to make a GET request to your backend API.
      // Replace the following line with your actual API call:
      return await axios.get(`/api/generated-content/${userId}`);
    },
  },
};
</script>
  
<style>
</style>
  
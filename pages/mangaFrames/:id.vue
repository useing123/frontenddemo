<template>
  <div id="app">
    <MangaFrames v-if="frames.length && Object.keys(text).length && Object.keys(dialogs).length"
                 :frames="frames" :text="text" :dialogs="dialogs" />
  </div>
</template>

<script>
import axios from 'axios';
import MangaFrames from '~/components/MangaFrames.vue';

export default {
  components: {
    MangaFrames
  },
  data() {
    return {
      frames: [],
      text: {},
      dialogs: {},
      loading: true,
      error: null,
    };
  },
  async created() {
    try {
      const id = this.$route.params.id;  // get dynamic id
      const response = await axios.get(`https://fastapi-9a00.onrender.com/manga/read/details/${id}`);
      const data = response.data;

      if (!Array.isArray(data.imgur_links)) {
        throw new Error('Invalid imgur_links data format.');
      }

      this.frames = data.imgur_links;

      const descriptions = data.manga_frames_description.split('Frame №');
      const dialogs = data.manga_story_dialogs.split('Frame №');

      descriptions.shift(); // Remove first empty element
      dialogs.shift(); // Remove first empty element

      descriptions.forEach((description, index) => {
        const descriptionText = description.split(':')[1].trim(); // Get only the description after ":"
        this.text[`Frame №${index + 1}`] = descriptionText;
      });

      dialogs.forEach((dialog, index) => {
        const dialogText = dialog.split(':')[1].trim(); // Get only the dialog after ":"
        this.dialogs[`Frame №${index + 1}`] = dialogText;
      });

      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.error = 'Failed to fetch manga details. Please try again later.';
      console.error(error);
    }
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>

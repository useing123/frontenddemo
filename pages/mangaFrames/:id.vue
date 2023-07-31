<template>
  <div id="app">
    <MangaFrames v-if="frames.length && Object.keys(dialogs).length"
                 :frames="frames" :dialogs="dialogs" />
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
      dialogs: {},
      loading: true,
      error: null,
    };
  },
  async created() {
    try {
      const id = this.$route.params.id;
      const response = await axios.get(`https://fastapi-9a00.onrender.com/manga/read/details/${id}`);
      const data = response.data;

      const dialogs = data.manga_story_dialogs;

      // Remove the prefix "Manga story dialogs: "
      const dialogsWithoutPrefix = dialogs.replace('Manga story dialogs: ', '');

      if (!Array.isArray(data.imgur_links)) {
        throw new Error('Invalid imgur_links data format.');
      }

      this.frames = data.imgur_links;

      const dialogRegEx = /Frame №(\d+):(.+)/;

      const dialogsSplit = dialogsWithoutPrefix.split('\n\n');

      dialogsSplit.forEach((dialog) => {
        const match = dialogRegEx.exec(dialog);
        if (match) {
          const frameNumber = match[1];
          const dialogText = match[2].trim();
          this.dialogs[`Frame №${frameNumber}`] = dialogText;
        }
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

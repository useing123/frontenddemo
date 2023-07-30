<template>
  <div id="app">
    <MangaFrames v-if="frames.length && Object.keys(text).length" :frames="frames" :text="text" />
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
    };
  },
  async created() {
    const id = this.$route.params.id;  // get dynamic id
    const response = await axios.get(`https://fastapi-9a00.onrender.com/manga/read/details/${id}`);
    const data = response.data;

    this.frames = data.imgur_links; // assuming 'imgur_links' is an array of strings

    const descriptions = data.manga_frames_description.split('\n\n');
    descriptions.forEach((description, index) => {
      this.text[`Frame №${index + 1}`] = description.trim();
    });
  },
};
</script>

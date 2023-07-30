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

      const descriptions = data.manga_frames_description.split('\n\n');
      descriptions.forEach((description, index) => {
        this.text[`Frame №${index + 1}`] = description.trim();
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

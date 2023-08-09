<template>
  <div id="app" class="p-6 bg-red flex flex-col items-start rounded-lg shadow-md">
    <!-- Toolbar appears on hover or touch -->
    <div id="toolbar">
      <button @click="goBack" class="bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 mb-4 rounded">
        ← Go back
      </button>
    </div>

    <div v-if="loading" class="mt-4 text-center text-white">
      Loading...
      <div class="mt-4">
        Your manga is being prepared for your enjoyment, please hold tight.
      </div>
      <div class="mt-4">
        In the meantime, explore other captivating stories from our collection.
      </div>
      <button @click="goToMangaCollection" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 mt-2 rounded">
        Browse Manga Collection
      </button>
    </div>

    <div v-else-if="error" class="mt-4 text-red-500">{{ error }}</div>

    <div v-else>
      <MangaFrames :frames="frames" :dialogs="dialogs" />
      <ScrollTopButton />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MangaFrames from "~/components/MangaFrames.vue";
import ScrollTopButton from "~/components/ScrollTopButton.vue";

export default {
  components: {
    MangaFrames,
    ScrollTopButton,
  },
  data() {
    return {
      frames: [],
      dialogs: {},
      loading: true,
      error: null,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goToMangaCollection() {
      this.$router.push('/mangaCollection');
    },
  },
  async created() {
    try {
      const id = this.$route.params.id;
      const response = await axios.get(`https://fastapi-9a00.onrender.com/manga/read/details/${id}`);
      const data = response.data;

      if (!Array.isArray(data.imgur_links)) {
        throw new Error("Invalid imgur_links data format.");
      }

      this.frames = data.imgur_links;

      if (!data.manga_story_dialogs || typeof data.manga_story_dialogs !== 'string') {
        throw new Error("Invalid manga_story_dialogs data format.");
      }

      const dialogs = data.manga_story_dialogs;
      const dialogsWithoutPrefix = dialogs.replace("Manga story dialogs: ", "");
      const dialogRegEx = /Frame №(\d+):(.+)/;
      const dialogsSplit = dialogsWithoutPrefix.split("\n\n");

      try {
        dialogsSplit.forEach((dialog) => {
          const match = dialogRegEx.exec(dialog);
          if (match) {
            const frameNumber = match[1];
            const dialogText = match[2].trim();
            this.dialogs[`Frame №${frameNumber}`] = dialogText;
          }
        });
      } catch (error) {
        throw new Error("Error processing dialogs. " + error.message);
      }

    } catch (error) {
      this.error = "Failed to fetch manga details. Please try again later.";
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
#toolbar {
  transition: opacity 0.3s;
  opacity: 0;
}

#app:hover #toolbar, #app:active #toolbar {
  opacity: 1;
}
</style>

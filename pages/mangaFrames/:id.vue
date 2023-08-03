<template>
  <div
    id="app"
    class="p-6 bg-red flex flex-col items-start rounded-lg shadow-md"
  >
    <button
      @click="goBack"
      class="bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 mb-4 rounded"
    >
      ← Go back
    </button>
    <div v-if="loading" class="mt-4">
      Loading...
      <div v-if="loading" class="mt-4 text-center text-white">
        Your manga is still being drawn, please wait...
      </div>
      <div class="mt-4 text-center text-white">
        While your manga is still being drawn, you might want to check out other manga in our collection.
      </div>
      <button
        @click="goToMangaCollection"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-8 mt-2 rounded"
      >
        Read
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
      const response = await axios.get(
        `https://fastapi-9a00.onrender.com/manga/read/details/${id}`
      );
      const data = response.data;

      const dialogs = data.manga_story_dialogs;

      // Remove the prefix "Manga story dialogs: "
      const dialogsWithoutPrefix = dialogs.replace("Manga story dialogs: ", "");

      if (!Array.isArray(data.imgur_links)) {
        throw new Error("Invalid imgur_links data format.");
      }

      this.frames = data.imgur_links;

      const dialogRegEx = /Frame №(\d+):(.+)/;

      const dialogsSplit = dialogsWithoutPrefix.split("\n\n");

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
      this.error = "Failed to fetch manga details. Please try again later.";
      console.error(error);
    }
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>

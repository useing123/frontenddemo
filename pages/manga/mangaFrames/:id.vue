<template>
  <div>
    <MangaFrames :frames="frames" :text="text" />
    <router-link to="/manga"> <!-- Add a back button to return to the manga details page -->
      <button class="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Back to Manga Details</button>
    </router-link>
  </div>
</template>

<script>
import data from '~/static/data.json';
import MangaFrames from '~/components/MangaFrames.vue';

export default {
  data() {
    const textArray = data.text.split('\n');
    const textObject = {};

    textArray.forEach((text) => {
      const frameName = text.split(':')[0].trim();
      textObject[frameName] = text.split(':').slice(1).join(':').trim();
    });

    return {
      text: textObject,
      frames: data.img,
    };
  },
  components: {
    MangaFrames,
  },
};
</script>

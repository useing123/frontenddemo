<template>
  <div class="manga-container">
    <div v-for="(imageUrl, frameName, index) in frames" :key="index">
      <div class="frame">
        <div :ref="frameName + 'Text'" class="text-container" v-if="dialogs && dialogs[`Frame №${Number(frameName) + 1}`]">
          {{ dialogs[`Frame №${Number(frameName) + 1}`] }}
        </div>
        <canvas :ref="frameName" :width="canvasWidth" :height="canvasHeight"></canvas>
      </div>
      <!-- Adding a black square of 200px height between frames -->
      <div v-if="index < frames.length - 1" class="black-square"></div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    frames: {
      type: Array,
      required: true,
    },
    dialogs: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      canvasWidth: 800,
      canvasHeight: 800, // Increased height for a more vertical scroll which is typical for Webtoon-style mangas
      preloadedImages: [],
    };
  },
  methods: {
    async preloadImages() {
      this.preloadedImages = await Promise.all(this.frames.map(url => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve(img);
          img.onerror = reject;
        });
      }));
    },
    generateMangaFrames() {
      for (let frameName in this.frames) {
        const canvasElement = this.$refs[frameName][0];
        if (canvasElement) {
          const ctx = canvasElement.getContext("2d");
          const img = this.preloadedImages[frameName];

          // Draw the image on the canvas
          ctx.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight);
        }
      }
    },
  },
  async mounted() {
    try {
      await this.preloadImages();
      this.generateMangaFrames();
    } catch (error) {
      console.error("Error while preloading images:", error);
    }
  },
};
</script>

<style scoped>
.manga-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.frame {
  margin-bottom: 20px;
  position: relative;
}

canvas {
  max-width: 100%;
}

.text-container {
  position: absolute;
  bottom: 0; 
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  color: white;
  padding: 10px;
  overflow: hidden;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Bangers', cursive;
}

/* Style for the black square */
.black-square {
  background-color: black;
  width: 100%;
  height: 200px;
}
</style>
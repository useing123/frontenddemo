<template>
  <div class="manga-container">
    <div v-for="(imageUrl, frameName, index) in frames" :key="index" class="frame">
      <canvas
        :ref="frameName"
        :width="canvasWidth"
        :height="canvasHeight"
      ></canvas>
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
    text: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      canvasWidth: 800,
      canvasHeight: 600,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.generateMangaFrames();
    });
  },
  methods: {
    generateMangaFrames() {
      for (let frameName in this.frames) {
        const canvasElement = this.$refs[frameName][0];
        if (canvasElement) {
          const ctx = canvasElement.getContext("2d");

          // Create an image element for the frame
          const img = new Image();
          img.src = this.frames[frameName];

          // Draw the image on the canvas
          img.onload = () => {
            ctx.drawImage(img, 0, 0, this.canvasWidth, this.canvasHeight);

            // Draw the manga cloud with text on the canvas
            if (this.text && this.text[`Frame №${frameName + 1}`]) {
              this.drawMangaCloud(ctx, this.text[`Frame №${frameName + 1}`]);
            }
          };
        }
      }
    },
    drawMangaCloud(ctx, text) {
      // Set font properties
      const fontSize = 15;
      const fontFamily = "Arial";  // Using the Comic Neue font
      ctx.font = `${fontSize}px ${fontFamily}`;

      // Calculate the position to center the text
      const textWidth = ctx.measureText(text).width;
      const x = (this.canvasWidth - textWidth) / 2;
      const y = this.canvasHeight - 80;

      // Set the fill color
      ctx.fillStyle = "white";

      // Draw the cloud background
      const cloudPadding = 25;
      const cloudHeight = fontSize + cloudPadding * 3;
      const cloudWidth = textWidth + cloudPadding * 2;
      const cloudX = x - cloudPadding;
      const cloudY = y - cloudPadding;
      ctx.fillRect(cloudX, cloudY, cloudWidth, cloudHeight);

      // Render the text on the canvas
      ctx.fillStyle = "black";
      ctx.fillText(text, x, y);
    },
  },
};
</script>

<style>
.manga-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.frame {
  margin-bottom: 20px;
}

canvas {
  max-width: 100%;
}
</style>

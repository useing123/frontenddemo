<template>
  <div class="manga-container">
    <div
      v-for="(imageUrl, frameName, index) in frames"
      :key="index"
      class="frame"
    >
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
    dialogs: {
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

            // Draw the manga cloud with dialog on the canvas
            if (
              this.dialogs &&
              this.dialogs[`Frame №${Number(frameName) + 1}`]
            ) {
              this.drawMangaCloud(
                ctx,
                this.dialogs[`Frame №${Number(frameName) + 1}`]
              );
            }
          };
        }
      }
    },
    drawMangaCloud(ctx, dialog) {
  // Set font properties
  const fontSize = 20;
  const fontFamily = "Arial"; 
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.textAlign = "right";

  // Split the dialog into lines
  const words = dialog.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    if (width < this.canvasWidth - 80) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);

  // Draw each line on the canvas
  lines.forEach((line, index) => {
    const x = this.canvasWidth - 40;  // 40px padding from the right edge
    const y = 40 + index * (fontSize + 10);  // 40px padding from the top edge, 10px line spacing

    // Draw the cloud background
    ctx.fillStyle = "white";
    const cloudWidth = ctx.measureText(line).width + 20;  // 20px padding
    const cloudHeight = fontSize + 10;  // 10px padding
    const cloudX = x - cloudWidth + 10;  // 10px padding
    const cloudY = y - fontSize;
    ctx.fillRect(cloudX, cloudY, cloudWidth, cloudHeight);

    // Render the text on the canvas
    ctx.fillStyle = "black";
    ctx.fillText(line, x, y);
  });
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

<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['isVisible'],
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 500px;
  }
  </style>
  
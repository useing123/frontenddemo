<template>
    <li class="faq-item" @click="$emit('toggle')">
      <p class="question" role="button" tabindex="0">
        {{ question }}
        <span class="icon">
          <i class="fas" :class="isOpen ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
        </span>
      </p>
      <transition name="slide-fade">
        <p v-if="isOpen" class="answer mt-2">
          {{ answer }}
        </p>
      </transition>
    </li>
  </template>
  
  <script>
  export default {
    props: {
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
      isOpen: {
        type: Boolean,
        default: false,
      },
    },
  };
  </script>
  
  <style scoped>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }
  .faq-item .question {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .faq-item .icon {
    color: #e50914;
  }
  .answer {
    color: #737373;
  }
  </style>
  
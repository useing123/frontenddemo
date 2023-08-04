<template>
    <div class="open-roles">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="(role, index) in roles" :key="index" class="bg-white rounded-lg shadow-md p-6">
          <h3 class="font-semibold text-xl text-gray-800">{{ role.title }}</h3>
          <p class="font-light my-2 text-base text-gray-600">Technology Stack: {{ role.stack }}</p>
          <p class="font-light my-4 text-base text-gray-600">{{ role.description }}</p>
          <button @click="redirectToEmail(role.title)" class="apply-btn bg-green-500 text-white py-2 px-4 rounded-md w-full">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        roles: [
          {
            title: "Front-end Developer",
            stack: "HTML, CSS, JavaScript, VueJS",
            description: "You'll be responsible for developing the user-facing part of our application.",
          },
          {
            title: "Back-end Developer",
            stack: "Python, FastAPI, MongoDB",
            description: "You'll be developing the server-side logic, working with databases, and ensuring high performance and responsiveness.",
          },
          {
            title: "Flutter Developer",
            stack: "Dart, Flutter, MongoDB",
            description: "You'll develop cross-platform mobile applications using the Flutter framework.",
          },
          {
            title: "MLOps",
            stack: "Python, TensorFlow, Docker, Kubernetes",
            description: "You'll work on implementing and optimizing machine learning operations to ensure smooth deployment and maintenance of ML models.",
          },
          {
            title: "ML Engineer",
            stack: "Python, Scikit-learn, TensorFlow, PyTorch, DiffusionModels, GANs",
            description: "You'll be involved in designing, developing, and deploying machine learning models for our projects.",
          }
        ],
      };
    },
    methods: {
      redirectToEmail(jobTitle) {
        const recipientEmail = "useing322@gmail.com";
        const subject = `Job Application for ${jobTitle}`;
        const body = `Dear Hiring Team,\n\nI am interested in applying for the ${jobTitle} position.\n\nKind regards,\n[Your Name]`;
  
        const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
      },
    },
  };
  </script>
  
  <style scoped>
  .open-roles {
    padding: 20px;
  }
  
  .grid {
    display: grid;
  }
  
  @media (min-width: 768px) {
    .grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }
  
  @media (min-width: 1024px) {
    .grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  
  @media (min-width: 1280px) {
    .grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  
  .bg-white {
    background-color: #ffffff;
  }
  
  .rounded-lg {
    border-radius: 0.5rem;
  }
  
  .shadow-md {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  
  .p-6 {
    padding: 1.5rem;
  }
  
  .font-semibold {
    font-weight: 600;
  }
  
  .text-xl {
    font-size: 1.25rem;
  }
  
  .text-gray-800 {
    color: #2d3748;
  }
  
  .my-2 {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .my-4 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  
  .text-base {
    font-size: 1rem;
  }
  
  .text-gray-600 {
    color: #4a5568;
  }
  
  .apply-btn {
    background-color: #008000;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 0.25rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .apply-btn:hover {
    background-color: #32cd32;
  }
  
  .w-full {
    width: 100%;
  }
  
  .py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  
  .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  </style>
  
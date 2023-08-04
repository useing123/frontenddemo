<template>
  <div class="vacancies-container">
    <div class="vacancies-content">
      <h1 class="font-extrabold text-3xl md:text-6xl text-white">
        Join Our Adventure - Mangai.me
      </h1>
      <p class="font-light my-8 text-xl md:text-2xl text-gray-300">
        Help us shape the future of personalized manga. Let's have some fun
        while we're at it!
      </p>
      <hr class="my-8 border-gray-200" />
      <h2 class="font-semibold text-2xl text-white">Open Roles</h2>
      <OpenRoles />
      <hr class="my-8 border-gray-200" />
      <h2 class="font-semibold text-2xl text-white">Think You're a Match?</h2>
      <p class="font-light my-8 text-xl md:text-2xl text-gray-300">
        Shoot us your CV and a cover letter telling us why you'd love to join
        our manga-loving team!
      </p>
      <hr class="my-8 border-gray-200" />
      <button @click="goBack" class="go-back-btn bg-blue-500">
        Back to Homepage
      </button>
      <!-- <NuxtLink to="http://ko-fi.com/ossein">
        Support 
      </NuxtLink> -->
    </div>
  </div>
</template>
  
  <script>
import OpenRoles from "@/components/OpenRoles.vue";

export default {
  components: {
    OpenRoles,
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>
  
  <style scoped>
.vacancies-container {
  padding: 1rem;
  padding-top: 80px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #141414;
  width: 100%;
  box-sizing: border-box;
}

.vacancies-content {
  width: 100%;
  text-align: center;
}

hr {
  border-color: #2c2c2c;
}

.go-back-btn {
  background-color: #1e90ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.go-back-btn:hover {
  background-color: #87cefa;
}
</style>
  
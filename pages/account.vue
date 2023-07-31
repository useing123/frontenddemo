<template>
  <div class="account-page">
    <AccountDetails ref="accountDetails" class="account-details"/>
    <UpdateAccount class="update-account"/>
    <button class="cta-button" @click="navigateToMangaGeneration">
      Generate Manga
    </button>
  </div>
</template>

<script>
import AccountDetails from '@/components/AccountDetails.vue';
import UpdateAccount from '@/components/UpdateAccount.vue';

export default {
  components: {
    AccountDetails,
    UpdateAccount,
  },
  methods: {
    navigateToMangaGeneration() {
      this.$router.push('/mangaGeneration');
    }
  }
};
</script>

<style scoped>
.account-page {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1em;
  align-items: start;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
  padding: 1em;
  box-sizing: border-box;
}

.account-details,
.update-account {
  margin-bottom: 1em;
}

.cta-button {
  grid-column: span 2;
  justify-self: center;
  padding: 10px 20px;
  font-size: 1.2em;
  color: white;
  background-color: #ff4081;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #e0407e;
}
</style>

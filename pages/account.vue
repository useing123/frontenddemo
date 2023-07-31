<template>
  <div class="account-page">
    <AccountDetails ref="accountDetails"/>
    <UpdateAccount />
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
};
</script>

<style scoped>
.account-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

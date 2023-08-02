<template>
  <div class="faq-section">
    <h2 class="text-3xl font-semibold mb-4 text-white">Frequently Asked Questions</h2>
    <ul class="faq-list">
      <faq-item
        class="mb-4"
        v-for="(item, index) in faqItems"
        :key="index"
        :question="item.question"
        :answer="item.answer"
        :isOpen="item.showAnswer"
        @toggle="toggleAnswer(index)"
      />
    </ul>
  </div>
</template>

<script>
import FaqItem from './FaqItem.vue';

export default {
  components: {
    FaqItem,
  },
  data() {
    return {
      faqItems: [
        {
          question: 'What is Mangai.me?',
          answer: 'Mangai.me is a website for generating manga, which are Japanese comic books or graphic novels. Registration is required to use the manga generation feature, but not to read existing manga content on the website. You can freely browse and read the available manga without creating an account. However, if you want to generate your own manga, you will need to register for an account on the website. Creating an account allows you to access the manga generation tools and create your personalized manga stories.',
          showAnswer: false,
        },
        {
          question: 'Is registration required to access manga on your site?',
          answer: 'No, registration is not required to access and read manga on our site. You can freely browse and read the available manga without creating an account. However, creating an account will allow you to customize your reading experience, bookmark your favorite titles, and receive updates on new releases.',
          showAnswer: false,
        },
        {
          question: 'Are the manga on your site free to read?',
          answer: 'Yes, the majority of the manga on our site are available for free reading. However, please note that some premium or licensed content may require a small fee or a subscription to access.',
          showAnswer: false,
        },
        {
          question: 'Can I download manga to read offline?',
          answer: 'At Manga Generation, we prioritize the respect of manga creators and copyright holders. As such, downloading manga for offline reading is not supported on our platform. However, you can enjoy reading manga online through any internet-connected device.',
          showAnswer: false,
        },
        {
          question: 'Do you offer manga in languages other than English?',
          answer: 'Yes, we understand the global appeal of manga, and as such, we strive to provide manga in various languages, not just English. Depending on the availability and demand, you may find manga translated into Kazakh, Spanish, French, and other languages.',
          showAnswer: false,
        },
        {
          question: 'How frequently is new manga added to the site?',
          answer: 'We are committed to updating our manga library regularly. New manga chapters and volumes are added as soon as they become available from the publishers or scanlation teams. The update frequency may vary depending on the ongoing series and release schedules.',
          showAnswer: false,
        },
        {
          question: 'Can I request specific manga titles to be added to your site?',
          answer: 'Certainly! We value our user\' feedback and suggestions. While we cannot guarantee immediate additions, we take user requests seriously and consider them when expanding our manga collection.',
          showAnswer: false,
        },
        {
          question: 'Is there a way to interact with other manga enthusiasts on your site?',
          answer: 'Yes, we encourage community engagement among manga enthusiasts. You can participate in our forums, discuss your favorite manga series, recommend titles to others, and share your thoughts and opinions on various manga-related topics.',
          showAnswer: false,
        },
        {
          question: 'Are there parental controls for age-restricted content?',
          answer: 'We strive to create a safe and enjoyable environment for users of all ages. As such, we implement age-rating systems for manga with mature content. Parents can set up parental controls to restrict access to age-appropriate content for younger readers.',
          showAnswer: false,
        },
        {
          question: 'Do you have a mobile app for Manga Generation?',
          answer: 'You can stay informed about the mobile app\'s development and release by visiting our website and following our official social media accounts. We will share regular updates and announcements there.',
          showAnswer: false,
        }
      ],
    };
  },
  methods: {
    toggleAnswer(index) {
      this.faqItems[index].showAnswer = !this.faqItems[index].showAnswer;
    },
  },
};
</script>

<style scoped>
.faq-section {
  padding: 1rem;
  background-color: #141414;
}

.faq-section h2 {
  color: #ffffff;
  margin-bottom: 1rem;
}

.faq-list {
  list-style-type: none;
  padding-left: 0;
}

.faq-list .faq-item {
  border-bottom: 1px solid #303030;
  padding: 1rem 0;
  color: #b3b3b3;
  cursor: pointer;
}
</style>

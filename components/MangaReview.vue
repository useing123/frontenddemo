<template>
  <div class="app-container">
    <div class="main-content">
      <div class="review-container">
        <div class="review-input">
          <h3 class="font-extrabold text-3xl md:text-6xl text-white">Create a Review</h3>
          <input v-model="newReview.review" type="text" placeholder="Write your review..." class="review-text-field" />
          <input v-model.number="newReview.rating" type="number" min="0" max="10" placeholder="Rating (0-10)" class="review-rating-field"/>
          <button @click="createReview" class="submit-review-button">Submit Review</button>
        </div>
        <div class="reviews-display">
          <h3 class="font-semibold text-2xl text-white">Reviews</h3>
          <div v-for="review in reviews" :key="review.review_id" class="review-card">
            <p>{{review.review}}</p>
            <p>Rating: {{review.rating}}</p>
            <button @click="deleteReview(review.review_id)" class="delete-review-button">Delete Review</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      mangaId: this.$route.params.id,
      newReview: {
        review: "",
        rating: null
      },
      reviews: []
    };
  },
  async created() {
    this.fetchReviews();
  },
  methods: {
    async fetchReviews() {
      try {
        const response = await axios.get(`https://fastapi-9a00.onrender.com/manga/reviews/${this.mangaId}`);
        this.reviews = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async createReview() {
      try {
        const response = await axios.post('https://fastapi-9a00.onrender.com/manga/reviews', {
          manga_id: this.mangaId,
          ...this.newReview
        });
        this.reviews.push(response.data);
        this.newReview = {review: "", rating: null}; // Reset the form
      } catch (error) {
        console.error(error);
      }
    },
    async deleteReview(reviewId) {
      try {
        await axios.delete(`https://fastapi-9a00.onrender.com/manga/reviews/${reviewId}`);
        this.reviews = this.reviews.filter(review => review.review_id !== reviewId); // Remove the review from the list
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.app-container {
  padding: 1rem;
  padding-top: 80px; /* Add top padding to accommodate for the fixed header */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #141414;
  width: 100%;
  box-sizing: border-box;
}

.main-content {
  width: 100%;
  text-align: center;
}

.review-container {
  width: 100%;
  max-width: 800px;
  margin-top: 2rem;
}

.review-input, .reviews-display {
  margin-bottom: 2rem;
}

.review-text-field, .review-rating-field {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border-radius: 4px;
}

.submit-review-button, .delete-review-button {
  color: #fff;
  background-color: #e50914;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.5s ease;
  margin-top: 1rem;
}

.review-card {
  background-color: #2c2c2c;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
}

hr {
  border-color: #2c2c2c;
}
</style>

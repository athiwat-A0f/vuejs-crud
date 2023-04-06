<template>
  <div class="row">
    <div class="col mb-4">
      <div class="card">
        <div>
          <span v-if="tutorial.image"><img :src="'http://localhost:8080/uploads/' + tutorial.image"
              class="card-img-top min_height" alt="..."></span>
          <span v-else><img src="http://localhost:8080/uploads/no-image.jpg" class="card-img-top min_height"
              alt="..."></span>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ tutorial.title }}</h5>
          <p class="card-text">{{ tutorial.description }}</p>
          <router-link :to="{ name: 'index' }" class="btn btn-secondary">Back</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "/services/TutorialDataService";

export default {
  name: "detail",
  data() {
    return {
      tutorial: [],
      id: this.$route.params.id
    };
  },
  methods: {
    retrieveTutorial() {
      // console.log(this.$route.params.id)
      TutorialDataService.get(this.id)
        .then(response => {
          this.tutorial = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveTutorial();
  }
};
</script>
 
<style>
.min_height {
  min-height: 285px;
}
</style>
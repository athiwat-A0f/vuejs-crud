<template>
  <div class="row">
    <div class="col mb-4" v-for="(tutorial, index) in tutorials">
      <div class="card" style="width: 18rem;">
        <div>
          <span v-if="tutorial.image"><img :src="'http://localhost:8080/uploads/' + tutorial.image" class="card-img-top min_height" alt="..."></span>
          <span v-else><img src="http://localhost:8080/uploads/no-image.jpg" class="card-img-top min_height" alt="..."></span>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ tutorial.title }}</h5>
          <p class="card-text">{{ tutorial.description }}</p>
          <a href="#" class="btn btn-primary">Detail</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TutorialDataService from "/services/TutorialDataService";

export default {
  name: 'list-card',
  data() {
    return {
      tutorials: []
    };
  },
  methods: {
    retrieveTutorials() {
      TutorialDataService.getAllPublished()
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data)
        })
        .catch(e => {
          console.log(e);
        })
    }
  },
  mounted() {
    this.retrieveTutorials();
  }
} 
</script>
 
<style>
  .min_height {
    min-height: 285px;
  }
</style>
<template>
  <div class="row">
    <div class="col mb-4" v-if="tutorials.length" v-for="(tutorial, index) in tutorials">
      <div class="card" style="width: 18rem;">
        <div>
          <span v-if="tutorial.image"><img :src="'http://localhost:8080/uploads/' + tutorial.image"
              class="card-img-top" alt="..."></span>
          <span v-else><img src="http://localhost:8080/uploads/no-image.jpg" class="card-img-top"
              alt="..."></span>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ tutorial.title }}</h5>
          <p class="card-text">{{ (tutorial.description.length<100) ? tutorial.description : tutorial.description.substring(0, 100) + '...'  }}</p>
          <router-link :to="{ name: 'detail', params: { id: tutorial.id } }">More...</router-link>
        </div>
      </div>
    </div>
    <div v-else class="no_content">Not have content!</div>
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
.card-img-top {
  min-height: 285px;
}

.card-title {
  min-height: 60px;
  overflow: hidden;
}

.card-text {
  min-height: 120px;
}

.no_content {
  text-align: center;
  background-color: tomato;
}
</style>
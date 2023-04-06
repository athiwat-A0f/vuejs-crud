<template>
  <div class="container-fluid">
    <div v-if="currentTutorial" class="edit-form">
      <h4>Tutorial</h4>
      <form>
        <div class="form-grop" v-if="url">
          <td><img :src="url" class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt=""></td>
        </div>
        <div class="form-grop" v-else>
          <td v-if="currentTutorial.image"><img :src="'http://localhost:8080/uploads/' + currentTutorial.image" class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt=""></td>
          <td v-else><img :src="'http://localhost:8080/uploads/no-image.jpg'" class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt=""></td>
        </div>
        <div class="form-group">
          <label for="title">Image</label>
          <input type="file" class="form-control" id="title" @change="handleFileUpload( $event )" name="image"/> 
        </div>
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title" v-model="currentTutorial.title" />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea class="form-control" id="description" required v-model="currentTutorial.description" name="description" />
        </div>

        <div class="form-group mt-2">
          <label><strong>Status:</strong></label>
          {{ currentTutorial.published ? "Published" : "Pending" }}
        </div>
      </form>

      <div class="col-12 mt-2">
        <button class="btn btn-primary mr-2" v-if="currentTutorial.published" @click="updatePublished(false)">
          UnPublish
        </button>
        <button v-else class="btn btn-primary mr-2" @click="updatePublished(true)">
          Publish
        </button>
  
        <button class="btn btn-danger mr-2" @click="deleteTutorial">
          Delete
        </button>
  
        <button type="submit" class="btn btn-success" @click="updateTutorial">
          Update
        </button>

      </div>
      <p>{{ message }}</p>
    </div>

    <div v-else>
      <br />
      <p>Please click on a Tutorial...</p>
    </div>

    <router-link :to="{ name: 'list' }" class="btn btn-secondary">Back</router-link>
  </div>
</template>
  
<script>
import TutorialDataService from "/services/TutorialDataService";

export default {
  name: "add",
  data() {
    return {
      url: null,
      currentTutorial: null,
      message: ''
    };
  },
  methods: {
    handleFileUpload( event ) {
      this.currentTutorial.image = event.target.files[0];

      this.url = URL.createObjectURL(this.currentTutorial.image)
    },

    getTutorial(id) {
      TutorialDataService.get(id)
        .then(response => {
          this.currentTutorial = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        // image: this.currentTutorial.image,
        published: status
      };

      TutorialDataService.update(this.currentTutorial.id, data)
        .then(response => {
          console.log(response.data);
          this.currentTutorial.published = status;
          this.message = 'The status was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateTutorial() {
      TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then(response => {
          console.log(response.data);
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteTutorial() {
      TutorialDataService.delete(this.currentTutorial.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getTutorial(this.$route.params.id);
  }
};
</script>
  
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
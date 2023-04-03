<template>
  <div class="container-fluid">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Image</label>
        <input type="file" class="form-control" id="title" @change="handleFileUpload( $event )" name="upload"/> 
      </div>

      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" required v-model="tutorial.title" name="title" />
      </div>

      <div class="form-group mb-2">
        <label for="description">Description</label>
        <textarea class="form-control" id="description" required v-model="tutorial.description" name="description" />
      </div>

      <div class="col-12">
        <button @click="saveTutorial" class="btn btn-success">Submit</button>
      </div>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>

    <div class="col-12 mt-2">
      <router-link :to="'/tutorials/'" class="btn btn-secondary">Back</router-link>
    </div>
  </div>
</template>
  
<script>
import TutorialDataService from "/services/TutorialDataService";

export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        title: "",
        description: "",
        published: false,
        upload: "",
      },
      submitted: false
    };
  },
  methods: {
    handleFileUpload( event ) {
      this.tutorial.upload = event.target.files[0];
      console.log(event.target.files[0])
    },

    saveTutorial() {
      var data = {
        title: this.tutorial.title,
        description: this.tutorial.description,
        upload: this.tutorial.upload
      };
     
      TutorialDataService.create(data)
        .then(response => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
    }
  }
};
</script>
  
<style></style>
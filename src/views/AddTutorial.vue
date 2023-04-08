<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-6">
        <div v-if="!submitted">
          <div class="form-grop">
            <td v-if="url"><img :src="url" class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt=""></td>
            <td v-else><img :src="'http://localhost:8080/uploads/no-image.jpg'" class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt=""></td>
          </div>
          <div class="form-group">
            <label for="title">Image</label>
            <input type="file" class="form-control" id="title" @change="handleFileUpload( $event )" name="image" accept="image/*" ref="fileupload"/> 
          </div>
    
          <div class="form-group">
            <label for="title">Title</label>
            <input type="text" class="form-control" id="title" required v-model="tutorial.title" name="title" />
          </div>
    
          <div class="form-group mb-2">
            <label for="description">Description</label>
            <textarea class="form-control" id="description" required v-model="tutorial.description" name="description" rows="10" />
          </div>
    
          <div class="col-12">
            <button @click="saveTutorial" class="btn btn-success">Submit</button>
          </div>
        </div>
        <div v-else>
          <h4>You submitted successfully!</h4>
          <button class="btn btn-success" @click="newTutorial">Add</button>
        </div>
      </div>
    </div>


    <div class="col-12 mt-2">
      <router-link :to="{ name: 'list' }" class="btn btn-secondary">Back</router-link>
    </div>
  </div>
</template>
  
<script>
import TutorialDataService from "/services/TutorialDataService";

export default {
  name: "add",
  data() {
    return {
      url: null,
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
      // console.log(event.target.files[0].type)
      const type = event.target.files[0].type.split('/')[0]
      
      if(type!='image') {
        this.$refs.fileupload.value=null;
        this.url = 'http://localhost:8080/uploads/no-image.jpg';

        this.$swal.fire({
          title: 'Error!',
          text: 'only upload image!',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      } else {
        this.tutorial.image = event.target.files[0]
        this.url = URL.createObjectURL(this.tutorial.image)
      }
    },

    saveTutorial() {
      var data = {
        title: this.tutorial.title,
        description: this.tutorial.description,
        image: this.tutorial.image
      };
      
      console.log(data)
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
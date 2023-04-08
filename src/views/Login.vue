<template>
  <div class="container-fluid">
    <h5>email: admin@admin.com</h5> 
    <h5>password: admin1234</h5> <hr>
    <div class="card">
      <h5 class="card-header">Login</h5>
      <div class="card-body">

        <div class="col-6">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" v-model="email" required name="email" />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group mb-2">
            <label for="description">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" required name="password" />
          </div>
        </div>

        <div class="col-12">
          <button @click="handleSubmit" class="btn btn-success">Submit</button>
        </div>
      </div>
    </div>

    <div class="col-12 mt-2">
      <router-link :to="{ name: 'index' }" class="btn btn-secondary">Back</router-link>
    </div>

    <account-info username='matt' />
  </div>
</template>
  
<script>
export default {
  name: "add",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    handleSubmit() {
      // console.log(this.email)
      // console.log(this.password)
      if(this.email=='admin@admin.com' && this.password=='admin1234') {
        sessionStorage.setItem("userId", "1");

        window.location.replace('/')

      } else {
        this.email = "";
        this.password = "";

        this.$swal.fire({
          title: 'Error!',
          text: 'Email Or Password are not correct!',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }

    },


  }
};
</script>
  
<style></style>
<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link :to="{ name: 'index' }" class="navbar-brand">Home</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul v-if="id" class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link :to="{ name: 'list' }" class="nav-link">Tutorials</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'add' }" class="nav-link">Add</router-link>
            </li>
          </ul>
         
          <form class="d-flex" v-if="id">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                admin
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">profile</a></li>
                <li><a class="dropdown-item" href="#" @click="handleLogout">Logout</a></li>
              </ul>
            </li>
          </form>
          <form class="d-flex" v-else>
            <router-link :to="{ name: 'login' }" class="btn btn-outline-success">Login</router-link>
          </form>
        </div>
      </div>
    </nav>
    <div class="container mt-3 mb-5 pb-5">
      <router-view />
    </div>

    <footer>copyright@{{ new Date().getFullYear() }}</footer>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      id: null
    }
  },

  methods: {
    handleLogout() {
      sessionStorage.removeItem("userId");
  
      this.id = null
    }

  },

  mounted() {
    this.id = sessionStorage.getItem("userId")

    if(this.id) {
      this.$swal.fire({
          title: 'Success!',
          text: 'Login Success!',
          icon: 'success',
          confirmButtonText: 'OK'
        })
    }
  }



};
</script>


<style>

footer {
 position: fixed;
 bottom: 0;
 width: 100%;
 left: 0;
 background-color: #212529;
 color: white;
}

</style>
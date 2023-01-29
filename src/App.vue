<template>
  <div class="App" id="app">
    <div class="container">
      <div class="row">
        <div class="col">
          <Home />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import Home from "@/components/views/Home.vue"

export default {
  name: "App",
  components: { Home },
  data() {
    return {};
  },
  computed: {
    // ...mapState(['screen',]),
  },
  methods: {

  },
  mounted() {

  }
};
</script>

<style lang="scss">
body {
  background-color: white;
  color: black;
  margin: 0;
  overflow: hidden;
}
#app {
  height: 100vh;
  width: 100vw;
  overflow: scroll;
}
.App {
}
</style>

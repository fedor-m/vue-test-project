<template>
  <div class="home">
    <h2>News</h2>
    <img alt="Vue logo" src="../assets/logo.png" />
    <NewsList />
  </div>
</template>

<script>
import NewsList from "../components/NewsList";
export default {
  name: "Home",
  components: { NewsList },
};
</script>

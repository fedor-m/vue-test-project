<template>
  <ul>
    <li v-for="n in allNews" :key="n.id">
      <h3>
        <router-link :to="{ name: 'News', params: { id: n.id } }">{{
          n.title
        }}</router-link>
      </h3>
      <!--<button type="button" @click="deleteNews(n.id)">Delete News</button>-->
    </li>
  </ul>
</template>
<script>
export default {
  name: "NewsList",
  /*data() {
    return { news: [] };
  },*/
  computed: {
    allNews() {
      return this.$store.getters.getNews;
    },
  },
  //methods:mapActions()
  async mounted() {
    /*const res = await fetch("http://localhost:3001/news");
    const news = await res.json();
    this.news = news;*/
    this.$store.dispatch("fetchNews");
  },
  methods: {
    deleteNews(id) {
      this.$store.dispatch("deleteNews", id);
    },
  },
};
</script>
<style>
ul {
  list-style-type: none;
}
</style>

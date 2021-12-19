<template>
  <div>
    <h2>Information</h2>
    <h3 v-if="!edit">{{ currentNews.title }}</h3>
    <div v-if="!edit">{{ currentNews.text }}</div>
    <form v-else @submit.prevent="updateNews" method="POST">
      <input
        type="text"
        placeholder="Title"
        v-model="news.title"
        name="title"
        id="title"
      />
      <textarea
        placeholder="Text"
        v-model="news.text"
        name="text"
        id="text"
      ></textarea>
      <button type="submit" v-if="edit">Save</button>
    </form>
    <button type="button" v-if="!edit" @click="editNews(currentNews.id)">
      Edit
    </button>

    <button type="button" v-if="edit" @click="cancel">Cancel</button>
    <button type="button" @click="deleteNews(currentNews.id)">Delete</button>
  </div>
</template>
<script>
export default {
  computed: {
    id() {
      return this.$route.params.id;
    },
    currentNews() {
      return this.$store.getters.currentNews;
    },
  },
  data() {
    return {
      edit: false,
      news: {},
      oldNews: {},
    };
  },
  async mounted() {
    this.$store.dispatch("fetchCurrentNews", this.id);
  },
  methods: {
    deleteNews(id) {
      this.$store.dispatch("deleteNews", id);
      this.$router.push({ name: "Home" });
    },
    editNews() {
      this.edit = true;
      Object.assign(this.news, this.currentNews);
      Object.assign(this.oldNews, this.currentNews);
    },
    updateNews() {
      let obj = {};
      for (let i in this.news) {
        if (i !== "key") {
          if (this.news[i] !== this.currentNews[i]) {
            obj[i] = this.news[i];
          }
        }
      }
      if (JSON.stringify(obj) !== "{}") {
        obj.id = this.currentNews.id;
        this.$store.dispatch("updateNews", obj);
      } else {
        this.cancel();
      }
      this.edit = false;
    },
    cancel() {
      this.edit = false;
      Object.assign(this.news, this.oldNews);
    },
  },
};
</script>

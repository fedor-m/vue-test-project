<template>
  <form method="POST" @submit.prevent="submit">
    <p>
      <label for="title">Name:</label>
      <input
        id="title"
        type="text"
        name="title"
        placeholder="Title"
        v-model.lazy.trim="news.title"
      />
    </p>
    <p>
      <label for="text">Text:</label>
      <textarea
        id="text"
        name="textarea"
        rows="10"
        cols="50"
        placeholder="Text"
        v-model.lazy.trim="news.text"
      />
    </p>
    <input type="submit" value="Add News" />
  </form>
</template>
<script>
export default {
  data() {
    return { news: { title: "", text: "" } };
  },
  methods: {
    submit() {
      if (this.news.title.length > 0 && this.news.text.length > 0) {
        this.$store.dispatch("addNews", JSON.stringify(this.news));
      }
      this.news = { title: "", text: "" };
    },
  },
};
</script>

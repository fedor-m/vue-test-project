<template>
  <div class="about">
    <h1>This is a one news page</h1>
    <NewsOne :id="id" />
  </div>
</template>
<script>
import NewsOne from "../components/NewsOne";
export default {
  name: "NewsInfo",
  components: { NewsOne },
  props: {
    id: Number,
  },
};
</script>

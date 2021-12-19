import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    news: [],
    currentNews: {},
  },
  getters: {
    getNews(state) {
      return state.news;
    },
    currentNews(state) {
      return state.currentNews;
    },
  },
  mutations: {
    GET_NEWS(state, news) {
      state.news = news;
    },
    CURRENT_NEWS(state, news) {
      state.currentNews = news;
    },
    ADD_NEWS(state, n) {
      state.news.push(n);
    },
    DELETE_NEWS(state, id) {
      state.news = state.news.filter((n) => n.id !== id);
    },
    UPDATE_NEWS(state, data) {
      state.currentNews = data;
      const index = state.news.findIndex((n) => n.id === data.id);
      if (index !== -1) state.news.splice(index, 1, data);
    },
  },
  actions: {
    async fetchNews(ctx) {
      const res = await axios.get("http://localhost:3001/news");
      if (res.status === 200) {
        const news = res.data;
        ctx.commit("GET_NEWS", news);
      }
    },
    async fetchCurrentNews(ctx, id) {
      const res = await axios.get("http://localhost:3001/news/" + id);
      if (res.status === 200) {
        const news = res.data;
        ctx.commit("CURRENT_NEWS", news);
      }
    },
    async addNews(ctx, data) {
      const res = await axios.post(
        "http://localhost:3001/news",
        JSON.parse(data)
      );
      if (res.status === 201) {
        const news = res.data;
        ctx.commit("ADD_NEWS", news);
      }
    },
    async deleteNews(ctx, id) {
      const res = await axios.delete("http://localhost:3001/news/" + id);
      if (res.status === 200 || res.status === 204) {
        ctx.commit("DELETE_NEWS", id);
      }
    },
    async updateNews(ctx, data) {
      const parameters = { ...data };
      const res = await axios.patch(
        "http://localhost:3001/news/" + data.id,
        parameters
      );
      if (res.status === 200) {
        ctx.commit("UPDATE_NEWS", data);
      }
    },
  },
  modules: {},
});

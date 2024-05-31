<template>
  <div>
    <header class="header">
      <h1>Yardan Hadziq's Favourite Games</h1>
    </header>
    <form @submit.prevent="save">
      <input type="text" v-model="form.title" placeholder="Title" /><br>
      <textarea v-model="form.content" placeholder="Content"></textarea><br>
      <button type="submit">Save</button>
    </form>
    <div class="articles-grid">
      <div v-for="article in articles" :key="article.id" class="article-item">
        <h3>{{ article.title }}</h3>
        <p>{{ article.content }}</p>
        <button @click="edit(article)">Edit</button>
        <button @click="remove(article.id)">Delete</button>
      </div>
    </div>
    <button @click="load">Load</button>
    <p style="padding:10px" class="text-h6">Welcome to My Favourite Games</p>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const form = reactive({
      id: null,
      title: '',
      content: ''
    });

    const articles = ref([]);

    async function load() {
      try {
        const response = await axios.get('http://localhost:3000/articles');
        articles.value = response.data;
      } catch (error) {
        console.error('Error loading articles:', error);
      }
    }

    async function save() {
      try {
        const url = form.id ? `http://localhost:3000/articles/${form.id}` : 'http://localhost:3000/articles';
        const method = form.id ? "put" : "post";
        const response = await axios[method](url, form);
        console.log('Article saved:', response.data);

        if (method === 'put') {
          const index = articles.value.findIndex(article => article.id === response.data.id);
          if (index !== -1) {
            articles.value[index] = response.data;
          }
        } else {
          articles.value.push(response.data);
        }

        form.id = null;
        form.title = '';
        form.content = '';
      } catch (error) {
        console.error('Error saving article:', error);
      }
    }

    async function remove(id) {
      try {
        await axios.delete(`http://localhost:3000/articles/${id}`);
        console.log('Article deleted:', id);
        articles.value = articles.value.filter(article => article.id !== id);
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }

    function edit(article) {
      form.id = article.id;
      form.title = article.title;
      form.content = article.content;
    }

    onMounted(load);

    return { form, articles, save, edit, remove, load };
  }
}
</script>

<style scoped>
/* General Styling */
body {
  font-family: 'Arial, sans-serif';
  background-color: #181818;
  color: #ffffff;
  margin: 0;
  padding: 0;
}

/* Header Styling */
.header {
  position: sticky;
  top: 0;
  background-color: #202020;
  color: #ffffff;
  padding: 15px 20px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

h1 {
  margin: 0;
  font-size: 24px;
}

h3 {
  margin: 0;
  color: #ffffff;
}

/* Form Styling */
form {
  background-color: #282828;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin: 20px;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #3e3e3e;
  border-radius: 4px;
  font-size: 16px;
  background-color: #121212;
  color: #ffffff;
}

button[type="submit"] {
  background-color: #cc0000;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #ff0000;
}

/* Articles Grid Styling */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 0 20px;
}

.article-item {
  background-color: #282828;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.article-item h3 {
  margin-bottom: 10px;
}

.article-item p {
  margin-bottom: 10px;
  color: #ffffff; /* Set font color of content to white */
}

/* Button Styling */
button {
  background-color: #606060;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #909090;
}

button:last-child {
  background-color: #c62828;
}

button:last-child:hover {
  background-color: #e53935;
}

/* Welcome Text Styling */
.text-h6 {
  font-size: 20px;
  color: #ffffff;
  margin-top: 20px;
  text-align: center;
}
</style>

<template>
  <div class="content bg-hard" :class="{ dark }">
    <Header></Header>
    <Main></Main>
    <Footer></Footer>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Footer from './components/templates/Footer.vue';
import Header from './components/templates/Header.vue';
import Main from './components/templates/Main.vue';

export default {
  name: 'App',
  components: { Header, Main, Footer },
  computed: mapState(['user', 'dark'])
}
</script>

<style>
:root {
  --header-h: 60px;
  --footer-h: 120px;

  --black-hard: #252525;
  --black-half: #303030;
  --black-soft: #454545;

  --white-hard: #fcfcfc;
  --white-half: #ececec;
  --white-soft: #dcdcdc;

  --color-theme-1: #2C5F2D;
  --color-theme-2: #27AE60;

  --border-r: 5px;
}

@font-face {
  font-family: inter;
  src: url('./assets/fonts/inter.ttf');
}

@font-face {
  font-family: source-code;
  src: url('./assets/fonts/sourcecode.ttf');
}

* {
  box-sizing: border-box;
  margin: 0; padding: 0;
  font-size: 0.9rem;
  font-family: source-code;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  width: 100%; height: 100%;
}

/* general style configuration */
a { text-decoration: none; }
ul { list-style: none; }

button {
  border: none;
  cursor: pointer;
  border-radius: var(--border-r);
}

button:active {
  transform: scale(98%);
}

i.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  cursor: pointer;
}


/* theme configuration */
*.dark, .dark * { color: var(--white-half); }
* { color: var(--black-half); }

.bg-hard.dark { background-color: var(--black-hard); }
.bg-half.dark { background-color: var(--black-half); }
.bg-soft.dark { background-color: var(--black-soft); }

.bg-hard { background-color: var(--white-hard); }
.bg-half { background-color: var(--white-half); }
.bg-soft { background-color: var(--white-soft); }

.bg-theme { background-color: var(--color-theme); }
.bg-theme-contrast { background-color: var(--color-theme-contrast); }
</style>

<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/users">Users</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions({
      fetchData: 'fetchData'
    })
  },
  created() {
    this.fetchData();
  }
};
</script>

<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="incrementCounter">Increment Counter</button>
    <p>Counter value: {{ counter }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      counter: 'getCounter'
    }),
    message() {
      return `The counter value is ${this.counter}`;
    }
  },
  methods: {
    ...mapActions({
      incrementCounter: 'increment'
    })
  }
};
</script>

<template>
  <div>
    <h1>Users</h1>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      users: 'getUsers'
    })
  }
};
</script>

<script>
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    counter: 0,
    users: []
  },
  getters: {
    getCounter: (state) => state.counter,
    getUsers: (state) => state.users
  },
  mutations: {
    incrementCounter: (state) => state.counter++,
    setUsers: (state, users) => state.users = users
  },
  actions: {
    increment: ({ commit }) => commit('incrementCounter'),
    fetchData: async ({ commit }) => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        commit('setUsers', response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
});

export default store;
</script>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = () => import('./components/Home.vue');
const Users = () => import('./components/Users.vue');

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/users', component: Users }
  ]
});

export default router;
</script>

<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">
    <router-link 
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      v-slot="{ href,isActive }"
    >
      <li :class="[isActive && 'active']">
        <a :href="href" class="waves-effect waves-orange pointer">{{ link.title }}</a>
      </li>
    </router-link>
  </ul>
</template>

<script>

export default {
  props: {
    isOpen: Boolean
  },
  data: () => ({
    links: [
      { title: 'Account', url: '/profile' },
      { title: 'History', url: '/history' },
      { title: 'Planing', url: '/planing' },
      { title: 'New entry', url: '/record' },
      { title: 'Category', url: '/categories' },
    ]
  }),
}
</script>
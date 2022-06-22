<template>
  <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
    <router-link v-for="link in links" :key="link.url" :to="link.url" v-slot="{ href, isActive }">
      <li :class="[isActive && 'active']">
        <a :href="href" class="waves-effect waves-orange pointer">{{ link.title }}</a>
      </li>
    </router-link>
  </ul>
</template>

<script>
import filters from "@/filters/filters";

export default {
  props: {
    isOpen: Boolean,
  },
  data: () => ({
    links: [
      { title: filters.localizeFilter("Menu_balance"), url: "/" },
      { title: filters.localizeFilter("Menu_account"), url: "/profile" },
      { title: filters.localizeFilter("Menu_history"), url: "/history" },
      { title: filters.localizeFilter("Menu_planing"), url: "/planing" },
      { title: filters.localizeFilter("Menu_entry"), url: "/record" },
      { title: filters.localizeFilter("Menu_category"), url: "/categories" },
    ],
  }),
};
</script>

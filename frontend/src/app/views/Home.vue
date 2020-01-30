<template>
  <div class="home">
    <user-list />
  </div>
</template>

<script>
import UserListComponent from "../components/user-list/user.list.vue";

export default {
  name: "home",
  components: {
    ["user-list"]: UserListComponent
  }
};
</script>

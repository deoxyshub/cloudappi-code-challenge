<template>
  <div class="home">
    <UserListComponent />
  </div>
</template>

<script>
import UserListComponent from "../components/user-list/user.list.vue";

export default {
  name: "home",
  components: {
    UserListComponent
  }
};
</script>

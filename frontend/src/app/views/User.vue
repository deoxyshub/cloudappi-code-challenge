<template>
  <div class="user">
    <UserComponent />
  </div>
</template>

<script>
import UserComponent from "../components/user-edit/user.edit.vue";

export default {
  name: "user",
  components: {
    UserComponent
  }
};
</script>

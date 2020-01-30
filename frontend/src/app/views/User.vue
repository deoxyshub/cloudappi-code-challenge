<template>
  <div class="user">
    <cv-breadcrumb :no-trailing-slash="true">
      <cv-breadcrumb-item>
        <cv-link to="/">{{ $t("breadcrumb.home") }}</cv-link>
      </cv-breadcrumb-item>
      <template v-if="mode == 'new'">
        <cv-breadcrumb-item>
          <cv-link aria-current="page">{{ $t("breadcrumb.user") }}</cv-link>
        </cv-breadcrumb-item>
      </template>
      <template v-else>
        <cv-breadcrumb-item>
          <cv-link>{{ $t("breadcrumb.user") }}</cv-link>
        </cv-breadcrumb-item>
        <cv-breadcrumb-item>
          <cv-link aria-current="page">{{ currentpage }}</cv-link>
        </cv-breadcrumb-item>
      </template>
    </cv-breadcrumb>

    <user-edit
      :mode="mode"
      :userId="userId"
      v-bind:fullname.sync="currentpage"
    />
  </div>
</template>

<script>
import UserEditComponent from "../components/user-edit/user.edit.vue";

export default {
  name: "user",
  components: {
    ["user-edit"]: UserEditComponent
  },
  created() {
    this.userId = +this.$route.params.userId;
    this.mode = !this.userId ? "new" : "edit";
  },
  data() {
    return {
      mode: "",
      userId: 0,
      currentpage: ""
    };
  }
};
</script>

<template>
  <div class="home">
    <p>Home Page</p>
  </div>
</template>
<script>
export default {
  mounted() {
    this.$router.push("/login");
  },
};
</script>

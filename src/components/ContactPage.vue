<template>
  <div class="ContactPage">
    <input v-for="(item, i) in $contact_page[0].items" :key="i" :is="item.input_type" />
  </div>
</template>

<script>
export default {
  name: "ContactPage",
  props: {
    msg: String,
  },
  mounted() {
    console.log(this.$contact_page[0].items);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

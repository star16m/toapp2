<template>
  <v-flex xs12 text-xs-center mt-5 mb-3>
    <h1 class="display-2 font-weight-bold">{{ title }}</h1>
  </v-flex>
</template>

<script>
export default {
  name: 'Heading',
  props: {
    title: String
  },
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.title} - %s`
    }
  }
}
</script>

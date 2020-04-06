<template>
  <v-footer height="60" class="mt-5 justify-center text-xs-center d-block">
    <div class="mt-2">
      {{ appTitle }} - v{{ appVersion }} {{ $t('footer.BY') }}:star16m
    </div>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    appVersion() {
      return this.$store.getters.appVersion
    },
    appTitle() {
      return this.$store.getters.appTitle
    }
  }
}
</script>

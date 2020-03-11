<template>
  <v-container fluid>
    <v-layout row wrap>
      <Heading :title="$t('login.TITLE')" />
      <Description :description="$t('login.DESCRIPTION')" />
      <v-flex xs12 sm6 offset-sm3>
        <form @submit.prevent="submit">
          <v-layout column>
            <v-flex>
              <v-text-field
                id="email"
                name="email"
                type="text"
                :label="$t('login.EMAIL')"
                v-model="email"
                :data-vv-as="$t('login.EMAIL')"
                :error="errors.has('email')"
                :error-messages="errors.collect('email')"
                v-validate.disable="'required'"
                autocomplete="off"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                id="password"
                name="password"
                type="password"
                :label="$t('login.PASSWORD')"
                v-model="password"
                :data-vv-as="$t('login.PASSWORD')"
                :error="errors.has('password')"
                :error-messages="errors.collect('password')"
                v-validate.disable="'required|min:4'"
                autocomplete="off"
              ></v-text-field>
            </v-flex>
            <v-flex text-xs-center mt-5>
              <SubmitButton :text="$t('login.LOGIN')" />
            </v-flex>
            <v-flex text-xs-center>
              <v-btn
                :to="{ name: 'forgotPassword' }"
                color="white"
                small
                flat
                class="btnForgotPassword"
                >{{ $t('login.FORGOT_PASSWORD') }}</v-btn
              >
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
      <ErrorMessage />
    </v-layout>
  </v-container>
</template>

<script>
import router from '@/router'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['userLogin']),
    async submit() {
      const valid = await this.$validator.validateAll()
      if (valid) {
        await this.userLogin({
          email: this.email,
          password: this.password
        })
      }
    }
  },
  created() {
    if (this.$store.state.auth.isTokenSet) {
      router.push({ name: 'home' })
    }
  }
}
</script>

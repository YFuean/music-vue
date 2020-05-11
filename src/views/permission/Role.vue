<template>
  <v-container class="animated fadeIn move mt-n6 ml-1">
    <v-btn
      fab
      dark
      color="orange darken-2"
      elevation="16"
      @click="show = !show"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-row>
      <v-col
        cols="12"
        md="3"
        v-for="(role, index) in roles"
        :key="index"
      >
        <v-card
          max-width="344"
          class="mx-auto"
        >
          <v-list-item>
            <v-list-item-avatar color="grey"></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">{{ role.roleName }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
            height="100"
          ></v-img>
          <v-card-text>{{ role.description }}</v-card-text>
          <v-card-actions>
            <v-btn
              text
              color="deep-purple accent-4"
            >
              Read
            </v-btn>
            <v-btn
              text
              color="deep-purple accent-4"
            >
              Bookmark
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {
  name: 'Role',
  data() {
    return {
      show: false,
      roles: [],
      roleName: '',
      description: '',
      bottomNav: 'recent'
    }
  },
  components: {},
  created() {
    this.axios.get('/sysRole/list').then((res) => {
      if (res.data.code === 1) {
        this.roles = res.data.data
        console.log(JSON.stringify(this.roles))
      }
    })
  },
  mounted() {},
  methods: {
    addRole() {
      let role = {
        roleName: this.roleName,
        description: this.description
      }
      this.axios({
        method: 'post',
        url: '/sysRole',
        data: role
      }).then((res) => {
        this.show = false
        this.roles.splice(this.roles.length, 1, role)
        console.log(res.data)
      })
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss"></style>
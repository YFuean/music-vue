<template>
  <v-app class="animated zoomIn move ml-6 mr-6 pt-6">
    <v-row>
      <v-col
        md="6"
        class="d-flex flex-row"
      >
        <v-text-field
          v-model="keywords"
          :counter="10"
          label="keywords"
          oninput="search(event)"
          onporpertychange="search(event)"
          required
        ></v-text-field>
        <!-- <v-btn
          v-for="(item, index) in menus"
          :key="index"
          :color="item.icon"
          class="mr-3"
          @click="handleClick(item.title)"
          large
        >
          {{ item.title }}
        </v-btn> -->
        <v-btn @click="exportB()">导出</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <template v-for="(item, index) in songList">
        <v-col
          :key="index"
          cols="12"
          md="3"
        >

          <v-card
            class="mx-auto"
            max-width="344"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">{{ item.songListId }}</div>
                <v-list-item-subtitle>{{ item.songListName }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-img
                :aspect-ratio="16 / 9"
                :src="item.thumbnail"
              ></v-img>
            </v-list-item>

            <v-card-actions>
              <v-col>
                <div class="overline mb-4">{{ item.songCount }}歌曲数</div>
                <div class="overline mb-4">{{ item.likeCount }}赞</div>
                <div class="overline mb-4">{{ item.commentCount }}评论数</div>
              </v-col>
              <div class="overline mb-4">{{ item.playCounts }}播放量</div>
            </v-card-actions>
          </v-card>
        </v-col>
      </template>
    </v-row>
  </v-app>
</template>

<script>
export default {
  name: 'music-list',
  data() {
    return {
      menuList: this.$store.state.menuList,
      admin: this.$store.state.admin,
      menus: [],
      items: [],
      keywords: ''
    }
  },
  created() {
    // alert(this.$options.name)
    this.$store.commit('setMenuList', JSON.parse(localStorage.getItem('menuList')))
    this.menuList = this.$store.state.menuList
    console.log(this.menuList)
    for (let i = 0; i < this.menuList.length; i++) {
      let parent = this.menuList[i]
      if (parent.subMenus !== undefined) {
        for (let j = 0; j < parent.subMenus.length; j++) {
          let child = this.menuList[i]
          if (child.subMenus[j].path === this.$options.name) {
            this.menus = child.subMenus[j].subMenus
          }
        }
      }
    }
    console.log(this.menus)
    this.axios.get('/songList/all').then((res) => {
      this.items = res.data.data
    })
  },
  methods: {
    handleClick(title) {
      if (title === '查询') {
        this.search()
      }
      if (title === '导出') {
        this.exportB()
      }
      if (title === '删除') {
        this.delete()
      }
    },
    exportB() {
      alert('导出')
      this.axios.get(this.GLOBAL.baseUrl + '/songList/export').then((res) => {
        console.log('正在执行导出....')
        if (res.data.msg == '成功') {
          alert('导出成功')
          console.log('导出成功')
        } else {
          alert('导出失败')
          console.log('导出失败')
        }
      })
    },
    search() {}
  },
  computed: {
    songList() {
      return this.items.filter((item) => item.songListName.indexOf(this.keywords) >= 0)
    }
  }
}
</script>

<style scoped lang="scss">
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>

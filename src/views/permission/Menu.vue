<template>
  <v-container class="animated fadeIn move mt-n6 ml-1">
    <v-data-table
      :headers="headers"
      :items="menus"
      sort-by="menus"
      group-by="parentId"
      class="elevation-6 v-data-table--fixed"
    >
      <template v-slot:top>
        <v-toolbar
          flat
          color="cyan"
        >
          <v-toolbar-title>系统菜单</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                color="cyan"
                dark
                class="mb-2"
                v-on="on"
              >新增</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="2"
                    >
                      <v-text-field
                        v-model="editedItem.title"
                        label="title"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="2"
                    >
                      <v-text-field
                        v-model="editedItem.path"
                        label="path"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="2"
                    >
                      <v-text-field
                        v-model="editedItem.icon"
                        label="icon"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.sort"
                        label="sort"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  class="cyan"
                  dark
                  @click="close"
                >取消</v-btn>
                <v-btn
                  class="purple"
                  dark
                  @click="save"
                >保存</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >Reset</v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: '资源id',
          align: 'start',
          sortable: true,
          value: 'id'
        },
        { text: '父资源id', value: 'parentId' },
        { text: '资源类型', value: 'type' },
        { text: '资源名称', value: 'title' },
        { text: '资源路径', value: 'path' },
        { text: '资源图标', value: 'icon' },
        { text: '资源排序', value: 'sort' },
        { text: '操作', value: 'actions', sortable: false }
      ],
      menus: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        title: '',
        icon: '',
        sort: 0
      },
      defaultItem: {
        name: '',
        title: '',
        icon: '',
        sort: 0
      }
    }
  },
  created() {
    this.initialize()
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? '新增菜单' : '编辑菜单'
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    }
  },
  methods: {
    initialize() {
      this.axios.get('/sysMenu/list').then((res) => {
        this.menus = res.data.data
      })
    },
    editItem(item) {
      this.editedIndex = this.menus.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      const index = this.menus.indexOf(item)
      confirm('确定要删除这项吗?') && this.menus.splice(index, 1)
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.menus[this.editedIndex], this.editedItem)
      } else {
        this.menus.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>

<style scoped lang="scss"></style>

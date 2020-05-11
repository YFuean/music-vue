<template>
  <div>
    <v-container>
      <v-select
        v-model="selectionType"
        :items="['admin', 'editor']"
        label="Selection type"
      ></v-select>
      <v-row>
        <v-col>
          <v-treeview
            v-model="selection"
            :items="items"
            :selection-type="selectionType"
            selectable
            return-object
            open-all
          ></v-treeview>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col
          class="pa-6"
          cols="6"
        >
          <template v-if="!selection.length">
            No nodes selected.
          </template>
          <template v-else>
            <div
              v-for="node in selection"
              :key="node.id"
            >
              {{ node.name }}
            </div>
          </template>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Permission',
  data: () => ({
    selectionType: 'leaf',
    selection: [],
    items: [
      {
        id: '1',
        name: 'admin',
        children: [
          { id: '1a', name: 'Dashboard' },
          {
            id: '1b',
            name: '音乐管理',
            children: [
              {
                id: '1b1',
                name: '专辑管理',
                children: [{ id: '0001', name: '搜索' }]
              },
              {
                id: '1b2',
                name: '榜单管理',
                children: [
                  { id: '0002', name: '查询' },
                  { id: '0003', name: '导出' },
                  { id: '0004', name: '删除' }
                ]
              },
              {
                id: '1b1',
                name: '歌曲管理',
                children: [
                  { id: '0005', name: '搜索' },
                  { id: '0006', name: '新增' },
                  { id: '0007', name: '导入' },
                  { id: '0008', name: '导出' }
                ]
              }
            ]
          },
          {
            id: '1c',
            name: '权限管理',
            children: [
              { id: '1c1', name: '角色管理' },
              { id: '1c2', name: '菜单管理' },
              { id: '1c3', name: '授权管理' },
              { id: '1c4', name: '用户管理' }
            ]
          },
          { id: '1d', name: '系统说明' }
        ]
      },
      {
        id: '2',
        name: 'editor',
        children: [
          { id: '2a', name: 'Dashboard' },
          {
            id: '2b',
            name: '音乐管理',
            children: [
              { id: '2b1', name: '专辑管理' },
              { id: '2b2', name: '榜单管理' },
              { id: '2b1', name: '歌曲管理' }
            ]
          },
          { id: '2d', name: '系统说明' }
        ]
      }
    ]
  }),
  components: {},
  created() {},
  mounted() {},
  methods: {},
  computed: {}
}
</script>

<style scoped lang="scss"></style>

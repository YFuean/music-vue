<template>
  <div>
    <div>
      <mu-text-field
        v-model="keywords"
        placeholder="search"
        @blur.prevent="shows"
        style="margin:0 0px 0 20px"
      ></mu-text-field>
      <v-btn
        color="praimry"
        class="mr-3"
        @click="search()"
        large
      >搜索</v-btn>
    </div>
    <div style="display:flex;padding: 20px 20px;width: 100%;height: 100%">
      <div class="s-l-table">
        <mu-data-table
          :columns="columns"
          :data="sysUser"
          class="s-l-table-content"
        >
          <template slot-scope="scope">
            <td class="is-left">{{ scope.row.userId }}</td>
            <td class="is-left">{{ scope.row.userName }}</td>
            <td class="is-left">{{ scope.row.phone }}</td>
            <td class="is-left">{{ scope.row.email }}</td>
            <td class="is-left">{{ scope.row.gender }}</td>
            <td class="is-left">{{ scope.row.address }}</td>
            <td class="is-left">{{ scope.row.createTime.slice(0, 10) }}</td>
          </template>
        </mu-data-table>
        <mu-flex
          justify-content="center"
          v-if="show"
        >
          <!-- 每页显示的数量 -->
          <span style="margin-top: 10px">每页显示：</span>
          <mu-select
            style="width:70px"
            v-model="size"
            full-widt
          >
            <mu-option
              v-for="(option, index) in options"
              :key="index"
              :label="option"
              :value="option"
            ></mu-option>
          </mu-select>
          <!-- 分页 -->
          <mu-pagination
            :total="totalPage"
            :current.sync="currentPage"
          ></mu-pagination>
        </mu-flex>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
    return {
      currentPage: 1,
      size: 10,
      sysUser: [],
      show: true,
      options: ['5', '10', '20', '50'],
      totalPage: 3042,
      keywords: '',
      columns: [
        { title: 'id', width: 115, name: 'id', align: 'left' },
        { title: '用户名', name: 'user_name', width: 90, align: 'left' },
        { title: '电话', name: 'phone', width: 120, align: 'left' },
        { title: '邮件', name: 'email', width: 150, align: 'left' },
        { title: '性别', name: 'gender', width: 50, align: 'left' },
        { title: '地址', name: 'address', width: 150, align: 'left' },
        { title: '生日', name: 'create_time', width: 150, align: 'left' }
      ]
    }
  },
  components: {},
  created() {
    this.getUser()
    this.currentPage
  },
  mounted() {},
  watch: {
    size: function() {
      this.getUser()
    },
    currentPage: function() {
      this.getUser()
    }
  },
  methods: {
    search() {
      this.axios({
        method: 'get',
        url: this.GLOBAL.baseUrl + '/sysUser/blur?',
        // 问号带参，表单提交
        params: {
          field: this.keywords
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        this.sysUser = res.data.data
        this.show = false
      })
    },

    //获取用户
    getUser() {
      this.axios({
        method: 'get',
        url: this.GLOBAL.baseUrl + '/sysUser/page?',
        params: {
          currentPage: this.currentPage,
          size: this.size
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        this.sysUser = res.data.data
        console.log(this.sysUser)
      })
    },
    shows() {
      if (this.keywords === '') this.show = true
      this.getUser()
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.table {
  background-color: white;
  color: black;
}
.content {
  flex: 0 0 33%;
}
.btn {
  margin: 20px 20px;
}
.s-l-table {
  width: 100%;
  background-color: white;
  margin-right: 60px;
  box-shadow: 2px 2px 2px 2px #ddd;
  height: 80%;
  &-content {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    margin-bottom: 10px;
  }
}
.tabs {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 120px;
  overflow-y: auto;
}
.s-l-tab {
  background-color: white;
  box-shadow: 2px 2px 2px 2px #ddd;
  height: 100%;
  display: flex;
}
.childTable {
  overflow: auto;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.scroll-hidden {
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
  }
}
</style>
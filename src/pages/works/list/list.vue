<template lang="html">
  <div id="works-list-page">
    <div></div>
    <el-table :data="works" ref="table">
      <el-table-column
        prop="date"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名字">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <router-link class="logo" :to="{ name: 'works.detail', params: { id: scope.row.id } }">
            <el-button type="text" size="small">查看</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  export default {
    data() {
      return {
        works: [{
          id: '1',
          name: '欧莱雅系列1',
          date: '2017-09-30'
        }, {
          id: '2',
          name: '欧莱雅系列233',
          date: '2017-04-21'
        }, {
          id: '3',
          name: '欧莱323213',
          date: '2017-09-3'
        }, {
          id: '4',
          name: '欧莱32323',
          date: '2017-07-10'
        }]
      };
    },
    methods: {
    }
  };
</script>

<style lang="scss" type="text/scss">
  #works-list-page {
  
  }
</style>

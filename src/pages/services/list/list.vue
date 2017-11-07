<template lang="html">
  <div>
    <div id="services-list-page">
      <router-link :to="{ name: 'services.create' }">
        <el-button type="primary" class="create-button">新增品牌</el-button>
      </router-link>
      <el-button type="primary" class="create-button" @click="showSlidersDialog">修改轮播图</el-button>
      <el-table :data="services" ref="table">
        <el-table-column
          prop="id"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="新建时间">
        </el-table-column>
        <el-table-column
          prop="zh_cn.name"
          label="品牌名称">
        </el-table-column>
        <el-table-column
          prop="updatedAt"
          label="更新时间">
        </el-table-column>
        <el-table-column
          prop="enable"
          label="是否启用">
          <template scope="scope">
            {{scope.row.enable == 1 ? '是' : '否'}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <router-link class="logo" :to="{ name: 'services.detail', params: { id: scope.row.id } }">
              <el-button type="primary" size="small">查看</el-button>
            </router-link>
            <el-button type="danger" size="small" @click="destroy(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="pagination-container">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-row>
    </div>
    <sliders ref="sliders"></sliders>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  import customerApi from '../../../api/customer';
  import sliders from '../sliders/sliders';

  export default {
    data() {
      return {
        services: [],
        total: 0,
        pageSize: 20,
        currentPage: 1
      };
    },
    created() {
      this.loadTableData(this.currentPage, this.pageSize);
    },
    components: {
      sliders
    },
    methods: {
      showSlidersDialog() {
        this.$refs.sliders.open();
      },
      handleCurrentChange(val) {
        this.loadTableData(val, this.pageSize);
      },
      async loadTableData(page, rows) {
        const { content, totalElements } = await customerApi.list({ page, rows });
        this.services = content;
        this.total = totalElements;
      },
      destroy(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          customerApi.destroy(id).then(() => {
            this.loadTableData(this.currentPage, this.pageSize);
          });
        });
      }
    }
  };
</script>

<style lang="scss" type="text/scss">
  #services-list-page {
    .create-button {
      margin-bottom: 10px;
    }
  
    .pagination-container {
      margin-top: 20px;
      text-align: center;
    }
  }
</style>

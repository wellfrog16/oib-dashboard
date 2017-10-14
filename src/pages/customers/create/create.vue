<template lang="html">
  <div id="customers-create-page">
    <div class="op-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'customers.list' }">客户列表</el-breadcrumb-item>
        <el-breadcrumb-item>新增客户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-form ref="customerForm" :model="customer" label-width="150px" label-position="left">
        <el-form-item label="是否启用">
          <el-col :span="8">
            <el-switch
              v-model="customer.enable"
              on-color="#13ce66"
              off-color="#ff4949"
              :on-value="1"
              :off-value="0">
            </el-switch>
          </el-col>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-col :span="8">
            <el-input v-model="customer.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="客户名称（英文）">
          <el-col :span="8">
            <el-input v-model="customer.enName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="行业类别">
          <el-col :span="8">
            <el-input v-model="customer.trade"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="行业类别（英文）">
          <el-col :span="8">
            <el-input v-model="customer.enTrade"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="服务项目">
          <el-col :span="8">
            <el-input v-model="customer.service"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="服务项目（英文）">
          <el-col :span="8">
            <el-input v-model="customer.enService"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="是否VIP">
          <el-col :span="8">
            <el-switch
              v-model="customer.vip"
              on-color="#13ce66"
              off-color="#ff4949"
              :on-value="1"
              :off-value="0">
            </el-switch>
          </el-col>
        </el-form-item>
        <el-form-item label="备注">
          <el-col :span="8">
            <el-input type="textarea"
                      :rows="3"
                      v-model="customer.memo"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="create">新增</el-button>
          <el-button @click="gotoListView">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  import moment from 'moment';
  import { quillEditor } from 'vue-quill-editor';
  import customerApi from '../../../api/customer';

  export default {
    data() {
      return {
        customer: {
          title: '2017 OIB MOD',
          enTitle: '2017 OIB MOD',
          html: '<h2>我是例子</h2><div>hahahahaah</div>',
          enHtml: '<h2>I am Example</h2><div>hahahahaah</div>',
          enable: 1
        }
      };
    },
    components: {
      quillEditor
    },
    filters: {
      formatDate(value, format) {
        return moment(value).format(format);
      }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      }
    },
    methods: {
      create() {
        customerApi.save(this.customer).then(() => {
          this.gotoListView();
        });
      },
      gotoListView() {
        this.$router.push({ name: 'customers.list' });
      }
    }
  };
</script>

<style lang="scss" type="text/scss">
  #customers-create-page {
    .op-breadcrumb {
      margin-bottom: 20px;
    }
    .perview-html {
      margin: 20px;
    }
  
    .conver-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .conver-uploader .el-upload:hover {
      border-color: #20a0ff;
    }
    .conver-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .conver {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>

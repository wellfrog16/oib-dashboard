<template lang="html">
  <div id="customers-detail-page">
    <div class="op-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'customers.list' }">客户列表</el-breadcrumb-item>
        <el-breadcrumb-item v-if="isCreating">新增客户</el-breadcrumb-item>
        <el-breadcrumb-item v-else>客户详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-form ref="customerForm" :model="customer" label-width="150px" label-position="left">
        <div v-if="!isInputShown">
          <el-form-item label="ID">
            <el-col :span="8">{{customer.id}}</el-col>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-col :span="8">{{customer.createdAt}}</el-col>
          </el-form-item>
          <el-form-item label="更新时间">
            <el-col :span="8">{{customer.updatedAt}}</el-col>
          </el-form-item>
        </div>
        <el-form-item label="是否启用">
          <el-col :span="8">
            <el-switch
              :disabled="!isInputShown"
              v-model="customer.enable"
              on-color="#13ce66"
              off-color="#ff4949"
              :on-value="1"
              :off-value="0">
            </el-switch>
          </el-col>
        </el-form-item>
        <el-form-item label="排序序号">
          <el-col :span="8">
            <el-input v-model="customer.sort" v-if="isInputShown" placeholder="请输入排序序号（数字）"></el-input>
            <div v-else>{{customer.sort}}</div>
          </el-col>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-col :span="8">
            <el-input v-model="customer.name" v-if="isInputShown" placeholder="请输入客户名称"></el-input>
            <div v-else>{{customer.name}}</div>
          </el-col>
        </el-form-item>
        <el-form-item label="客户名称（英文）">
          <el-col :span="8">
            <el-input v-model="customer.enName" v-if="isInputShown" placeholder="请输入客户名称"></el-input>
            <div v-else>{{customer.enName}}</div>
          </el-col>
        </el-form-item>
        <el-form-item label="行业类别">
          <el-col :span="8">
            <el-input v-model="customer.category" v-if="isInputShown" placeholder="请输入行业类别"></el-input>
            <div v-else>{{customer.category}}</div>
          </el-col>
        </el-form-item>
        <el-form-item label="服务项目">
          <el-col :span="8">
            <el-input v-model="customer.project" v-if="isInputShown" placeholder="请输入服务项目"></el-input>
            <div v-else>{{customer.project}}</div>
          </el-col>
        </el-form-item>
        <el-form-item>
          <div v-if="isEditing">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="cancelEditMode">取消</el-button>
          </div>
          <div v-else-if="isCreating">
            <el-button type="primary" @click="save">新增</el-button>
            <el-button @click="gotoListView">取消</el-button>
          </div>
          <div v-else>
            <el-button type="primary" @click="changeEditMode">编辑</el-button>
            <el-button @click="gotoListView">返回</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  import { quillEditor } from 'vue-quill-editor';
  import customerApi from '../../../api/customer';
  import opUploadImg from '../../../components/op-upload-img/index';

  export default {
    data() {
      return {
        isEditing: false,
        isCreating: false,
        customer: {
          name: '嘉美乐',
          enName: 'CAMENAE', // 英文名
          category: '护肤', // 行业类别
          project: '策略', // 服务项目
          enable: 1, // number, 是否启用，1是 0否
        },
        precustomer: {}
      };
    },
    components: {
      quillEditor,
      opUploadImg
    },
    async created() {
      const { id } = this.$route.params;
      if (id) {
        this.customer = await customerApi.get(id);
      } else {
        this.isCreating = true;
      }
    },
    computed: {
      isInputShown() {
        return this.isEditing || this.isCreating;
      },
      editor() {
        return this.$refs.myQuillEditor.quill;
      }
    },
    methods: {
      save() {
        if (this.isEditing) {
          customerApi.save(this.customer.id, this.customer).then(() => {
            this.gotoListView();
          });
        } else {
          customerApi.create(this.customer).then(() => {
            this.gotoListView();
          });
        }
      },
      gotoListView() {
        this.$router.push({ name: 'customers.list' });
      },
      changeEditMode() {
        this.isEditing = true;
        Object.assign(this.precustomer, this.customer);
      },
      cancelEditMode() {
        this.isEditing = false;
        Object.assign(this.customer, this.precustomer);
      }
    }
  };
</script>

<style lang="scss" type="text/scss">
  #customers-detail-page {
    .op-breadcrumb {
      margin-bottom: 20px;
    }
  }
</style>

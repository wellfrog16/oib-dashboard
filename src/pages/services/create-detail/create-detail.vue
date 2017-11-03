<template lang="html">
  <div id="services-detail-page">
    <div class="op-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'services.list' }">品牌列表</el-breadcrumb-item>
        <el-breadcrumb-item v-if="isCreating">新增品牌</el-breadcrumb-item>
        <el-breadcrumb-item v-else>品牌详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-form ref="serviceForm" :model="service" label-width="150px" label-position="left">
        <div v-if="!isInputShown">
          <el-form-item label="ID">
            <el-col :span="8">{{serviceData.id}}</el-col>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-col :span="8">{{serviceData.createdAt}}</el-col>
          </el-form-item>
          <el-form-item label="更新时间">
            <el-col :span="8">{{serviceData.updatedAt}}</el-col>
          </el-form-item>
        </div>
        <el-form-item label="是否启用">
          <el-col :span="8">
            <el-switch
              :disabled="!isInputShown"
              v-model="serviceData.enable"
              on-color="#13ce66"
              off-color="#ff4949"
              :on-value="1"
              :off-value="0">
            </el-switch>
          </el-col>
        </el-form-item>
        <el-form-item label="排序序号">
          <el-col :span="8">
            <el-input v-model="serviceData.sort" v-if="isInputShown" placeholder="请输入排序序号（数字）"></el-input>
            <div v-else>{{serviceData.sort}}</div>
          </el-col>
        </el-form-item>
        <el-form-item label="英文首字母">
          <el-col :span="8">
            <el-select v-model="serviceData.initial" v-if="isInputShown" placeholder="请选择">
              <el-option
                v-for="(item, index) in initialOptions"
                :key="index"
                :label="item.label"
                :value="item">
              </el-option>
            </el-select>
            <div v-else>{{serviceData.initial.label}}</div>
          </el-col>
        </el-form-item>
        <el-form-item label="行业类别">
          <el-col :span="8">
            <el-select v-model="serviceData.category" v-if="isInputShown" placeholder="请选择">
              <el-option
                v-for="(item, index) in categoryOptions"
                :key="index"
                :label="item.label"
                :value="item">
              </el-option>
            </el-select>
            <div v-else>{{serviceData.category.label}}</div>
          </el-col>
        </el-form-item>
        <el-form-item label="服务项目">
          <el-col :span="8">
            <el-select v-model="serviceData.project" v-if="isInputShown" placeholder="请选择">
              <el-option
                v-for="(item, index) in projectOptions"
                :key="index"
                :label="item.label"
                :value="item">
              </el-option>
            </el-select>
            <div v-else>{{serviceData.project.label}}</div>
          </el-col>
        </el-form-item>
        <el-form-item label="英文版本">
          <el-col :span="8">
            <el-switch
              :disabled="!isInputShown"
              v-model="lang"
              on-color="#13ce66"
              off-color="#ff4949"
              on-value="en"
              off-value="zh_cn">
            </el-switch>
          </el-col>
        </el-form-item>
        <el-form-item :label="`品牌名称${isEnglish ? '（英文）' : ''}`">
          <el-col :span="8">
            <el-input v-model="service.name" v-if="isInputShown" placeholder="请输入客户名称"></el-input>
            <div v-else>{{service.name}}</div>
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

  const defaultServiceData = {
    name: ''
  };
  
  export default {
    data() {
      return {
        isEditing: false,
        isCreating: false,
        lang: 'zh_cn',
        serviceData: {
          zh_cn: Object.assign({}, defaultServiceData),
          initial: {
            value: null,
            label: ''
          }, // 英文首字母
          category: {
            value: null,
            label: ''
          }, // 行业类别
          project: {
            value: null,
            label: ''
          }, // 服务项目,
          enable: 1, // number, 是否启用，1是 0否
          sort: 0
        },
        categoryOptions: [{
          value: 1,
          label: '护肤',
          enLabel: 'hufu'
        }, {
          value: 2,
          label: '美容',
          enLabel: 'meirong'
        }],
        projectOptions: [{
          value: 1,
          label: '策略',
          enLabel: 'celve'
        }, {
          value: 2,
          label: '设计',
          enLabel: 'design'
        }],
        initialOptions: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z', '0~9']
          .map(item => ({ value: item, label: item })),
        preserviceData: {}
      };
    },
    components: {
      quillEditor,
      opUploadImg
    },
    async created() {
      const { id } = this.$route.params;
      if (id) {
        this.serviceData = await customerApi.get(id);
      } else {
        this.isCreating = true;
        this.serviceData.category = this.categoryOptions[0];
        this.serviceData.project = this.projectOptions[0];
        this.serviceData.initial = this.initialOptions[0];
      }
    },
    computed: {
      service() {
        this.serviceData[this.lang] = this.serviceData[this.lang] || defaultServiceData;
        return this.serviceData[this.lang];
      },
      isEnglish() {
        return this.lang === 'en';
      },
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
          customerApi.save(this.serviceData.id, this.serviceData).then(() => {
            this.gotoListView();
          });
        } else {
          customerApi.create(this.serviceData).then(() => {
            this.gotoListView();
          });
        }
      },
      gotoListView() {
        this.$router.push({ name: 'services.list' });
      },
      changeEditMode() {
        this.isEditing = true;
        Object.assign(this.preserviceData, this.serviceData);
      },
      cancelEditMode() {
        this.isEditing = false;
        Object.assign(this.serviceData, this.preserviceData);
      }
    }
  };
</script>

<style lang="scss" type="text/scss">
  #services-detail-page {
    .op-breadcrumb {
      margin-bottom: 20px;
    }
  }
</style>

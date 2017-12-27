<template lang="html">
  <div>
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
          <el-form-item label="英文首字母">
            <el-col :span="8">
              <el-select v-model="serviceData.initial" v-if="isInputShown" placeholder="请选择">
                <el-option
                  v-for="(item, index) in initialOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div v-else>{{serviceData.initial | formatEnums(initialOptions) }}</div>
            </el-col>
          </el-form-item>
          <el-form-item label="行业类别">
            <el-col :span="8">
              <div v-if="isInputShown">
                <el-select v-model="serviceData.category" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in categoryOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button type="success" size="small" @click="dialogVisible = true">
                  <i class="el-icon-edit"></i>
                </el-button>
              </div>
              <div v-else>{{serviceData.category | formatEnums(categoryOptions) }}</div>
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
    <el-dialog
      title="添加行业类别"
      :visible.sync="dialogVisible"
      size="tiny">
      <el-form :model="newIndustry" label-width="150px" label-position="top">
        <el-form-item label="已有类别">
          <div v-for="item in categoryOptions" :key="item.value">
            <el-tag type="success" style="margin-left: 10px;">{{item.label}}</el-tag>
            <el-tag type="warning" style="margin-left: 10px;">{{item.enLabel}}</el-tag>
          </div>
        </el-form-item>
        <el-form-item label="新增类别">
          <el-row>
            <el-input style="width: 250px; margin-bottom: 10px;" v-model="newIndustry.label" placeholder="请填写中文版标签"></el-input>
          </el-row>
          <el-row>
            <el-input style="width: 250px;" v-model="newIndustry.enLabel" placeholder="请填写英文版标签"></el-input>
          </el-row>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addIndustry">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  import { quillEditor } from 'vue-quill-editor';
  import formatEnums from '@/filters/enums';
  import customerApi from '../../../api/customer';
  import industryApi from '../../../api/industry';
  import opUploadImg from '../../../components/op-upload-img/index';

  const defaultServiceData = {
    name: ''
  };

  export default {
    data() {
      return {
        dialogVisible: false,
        isEditing: false,
        isCreating: false,
        lang: 'zh_cn',
        serviceData: {
          zh_cn: Object.assign({}, defaultServiceData),
          initial: null, // 英文首字母
          category: null, // 行业类别
          serviceTags: [], // 服务项目
          enable: 1 // number, 是否启用，1是 0否
        },
        categoryOptions: [],
        newIndustry: {
          label: '',
          enLabel: '',
        },
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
        this.categoryOptions = (await industryApi.list()).content;
        this.serviceData.category = this.categoryOptions[0];
        this.serviceData.initial = this.initialOptions[0];
      }
    },
    filters: {
      formatEnums
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
        this.preserviceData = JSON.parse(JSON.stringify(this.serviceData));
      },
      cancelEditMode() {
        this.isEditing = false;
        this.serviceData = JSON.parse(JSON.stringify(this.preserviceData));
      },
      addIndustry() {
        industryApi.create(this.newIndustry).then((data) => {
          this.categoryOptions.push({
            value: data.id,
            label: data.label,
            enLabel: data.enLabel
          });
          this.dialogVisible = false;
        });
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

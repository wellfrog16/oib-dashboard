<template lang="html">
  <div>
    <div id="works-detail-page">
      <div class="op-breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ name: 'works.list' }">作品列表</el-breadcrumb-item>
          <el-breadcrumb-item v-if="isCreating">新增作品</el-breadcrumb-item>
          <el-breadcrumb-item v-else>作品详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
        <el-form ref="workForm" :rules="vaildation" :model="workData" label-width="150px" label-position="left">
          <div v-if="!isInputShown">
            <el-form-item label="ID">
              <el-col :span="8">{{workData.id}}</el-col>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-col :span="8">{{workData.createdAt}}</el-col>
            </el-form-item>
            <el-form-item label="更新时间">
              <el-col :span="8">{{workData.updatedAt}}</el-col>
            </el-form-item>
          </div>
          <el-form-item label="是否启用">
            <el-col :span="8">
              <el-switch
                :disabled="!isInputShown"
                v-model="workData.enable"
                on-color="#13ce66"
                off-color="#ff4949"
                :on-value="1"
                :off-value="0">
              </el-switch>
            </el-col>
          </el-form-item>
          <el-form-item label="排序序号">
            <el-col :span="8">
              <el-input v-model="workData.sort" v-if="isInputShown" placeholder="请输入排序序号（数字）"></el-input>
              <div v-else>{{workData.sort}}</div>
            </el-col>
          </el-form-item>
          <el-form-item label="服务品牌" prop="brand">
            <template v-if="isInputShown">
              <el-select v-model="workData.brand" placeholder="请选择">
                <el-option
                  v-for="item in brandOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-button type="text" v-if="!brandOptions.length">
                <router-link :to="{ name: 'services.create' }">当前无服务品牌，请点击新建品牌</router-link>
              </el-button>
            </template>
            <div v-else>{{workData.brand | formatEnums(brandOptions)}}</div>
          </el-form-item>
          <el-form-item label="服务标签" prop="services">
            <div v-if="isInputShown">
              <el-select
                v-model="workData.services"
                multiple
                placeholder="请选择">
                <el-option
                  v-for="item in serviceTagOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-button type="success" size="small" @click="openDialog">
                <i class="el-icon-edit"></i>
              </el-button>
            </div>
            <div v-else>
              <el-tag type="success" v-for="item of workData.services" :key="item">{{item | formatEnums(serviceTagOptions)}}</el-tag>
            </div>
          </el-form-item>
          <el-form-item label="封面">
            <el-col :span="12">
              <op-upload-img
                v-if="isInputShown"
                v-model="workData.cover"
                ref="coverUpload"></op-upload-img>
              <img class="preview-img" v-else :src="workData.cover">
            </el-col>
          </el-form-item>
          <el-form-item label="Banner图">
            <el-col :span="12">
              <op-upload-img
                v-if="isInputShown"
                v-model="workData.bannerImg"
                ref="bannerImgUpload"></op-upload-img>
              <img class="preview-img" v-else :src="workData.bannerImg">
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
          <el-form-item :label="`作品名称${isEnglish ? '（英文）' : ''}`">
            <el-col :span="8">
              <el-input v-model="work.name" v-if="isInputShown" placeholder="请输入作品名称"></el-input>
              <div v-else>{{work.name}}</div>
            </el-col>
          </el-form-item>
          <el-form-item :label="`封面文字${isEnglish ? '（英文）' : ''}`">
            <el-col :span="8">
              <el-input v-model="work.coverText" v-if="isInputShown" placeholder="请输入封面文字"></el-input>
              <div v-else>{{work.coverText}}</div>
            </el-col>
          </el-form-item>
          <el-form-item :label="`封面视频地址${isEnglish ? '（英文）' : ''}`">
            <el-col :span="8">
              <el-input v-model="work.coverVideoUrl" v-if="isInputShown" placeholder="请输入封面视频链接"></el-input>
              <div v-else>{{work.coverVideoUrl}}</div>
            </el-col>
          </el-form-item>
          <el-form-item :label="`正文${isEnglish ? '（英文）' : ''}`">
            <el-col :span="24">
              <op-quill-editor v-model="work.contentHTML" ref="myQuillEditor" v-if="isInputShown"></op-quill-editor>
              <div v-else v-html="work.contentHTML" class="perview-html"></div>
            </el-col>
          </el-form-item>
          <el-form-item :label="`参与人员${isEnglish ? '（英文）' : ''}`">
            <el-row v-for="(item, index) of work.credits" :key="index">
              <el-col :span="5">
                <el-input v-if="isInputShown" placeholder="项目角色" v-model="item.job"></el-input>
                <div v-else>{{item.job}}</div>
              </el-col>
              <el-col :span="5" :push="1">
                <el-input v-if="isInputShown" placeholder="人员姓名" v-model="item.name"></el-input>
                <div v-else>{{item.name}}</div>
              </el-col>
              <div v-if="isInputShown">
                <el-col :span="2" :push="2" v-if="index !== 0">
                  <el-button type="danger" size="small" @click="removeCredits(index)"><i class="el-icon-minus"></i></el-button>
                </el-col>
                <el-col :span="4" :push="2" v-if="index == work.credits.length - 1">
                  <el-button type="success" size="small" @click="addCredits"><i class="el-icon-plus"></i></el-button>
                </el-col>
              </div>
            </el-row>
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
      title="添加服务标签"
      :visible.sync="dialogVisible"
      size="tiny">
      <el-form :model="newServiceTag" label-width="150px" label-position="top" ref="serviceTagForm">
        <el-form-item label="已有标签">
          <div v-for="item in serviceTagOptions" :key="item.value">
            <el-tag type="success" style="margin-left: 10px;">{{item.label}}</el-tag>
            <el-tag type="warning" style="margin-left: 10px;">{{item.enLabel}}</el-tag>
          </div>
        </el-form-item>
        <el-form-item label="新增标签" prop="label" :rules="[{ required: true, message: '中文标签不能为空' }]">
          <el-input style="width: 250px; margin-bottom: 10px;" v-model="newServiceTag.label" placeholder="请填写中文版标签"></el-input>
        </el-form-item>
        <el-input style="width: 250px;" v-model="newServiceTag.enLabel" placeholder="请填写英文版标签"></el-input>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addServiceTag">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  import workApi from '../../../api/work';
  import customerApi from '../../../api/customer';
  import serviceTagApi from '../../../api/service-tag';
  import formatEnums from '../../../filters/enums';
  import opUploadImg from '../../../components/op-upload-img/index';

  const defaultWorkData = {
    name: '',
    contentHTML: '', // string, 正文
    coverText: '', // string, 封面文字
    coverVideoUrl: '', // string, 封面视频地址
    credits: [{
      job: 'Project Director',
      name: '姜国政/jiang'
    }],
    additions: [{
      title: '链接',
      contents: [{
        label: 'OIB官网',
        value: 'http://oib.com'
      }]
    }]
  };

  export default {
    data() {
      return {
        dialogVisible: false,
        isEditing: false,
        isCreating: false,
        lang: 'zh_cn',
        workData: {
          brand: '', // 品牌
          services: [], // 服务标签
          cover: '', // string, 封面链接
          bannerImg: '', // string, 头图链接
          zh_cn: Object.assign({}, defaultWorkData),
          enable: 1, // number, 是否启用，1是 0否
          sort: null,  // number, 排序顺序
        },
        newServiceTag: {
          label: '',
          enLabel: ''
        },
        prework: {},
        serviceTagOptions: [],
        brandOptions: [],
        vaildation: {
          brand: [{ type: 'number', required: true, message: '请选择服务品牌', trigger: 'change' }],
          services: [{ type: 'array', required: true, message: '请至少选择一个服务标签', trigger: 'change' }]
        }
      };
    },
    components: {
      opUploadImg
    },
    async created() {
      this.brandOptions = (await customerApi.list())
        .content.map(item => ({
          value: item.id,
          label: item.zh_cn.name
        }));
      this.serviceTagOptions = (await serviceTagApi.list())
        .content.map(item => ({
          value: item.id,
          label: item.label,
          enLabel: item.enLabel
        }));
      const { id } = this.$route.params;
      if (id) {
        this.workData = await workApi.get(id);
      } else {
        this.isCreating = true;
      }
    },
    filters: {
      formatEnums
    },
    computed: {
      work() {
        this.workData[this.lang] = this.workData[this.lang] || defaultWorkData;
        return this.workData[this.lang];
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
        this.$refs.workForm.validate((vaild) => {
          if (vaild) {
            this.$confirm(`当前编辑的语言版本为（${this.isEnglish ? '英文' : '中文'}），确认保存吗？`).then(() => {
              const { coverUpload, bannerImgUpload } = this.$refs;
              // 需用户手动上传封面和banner两张图片
              if (coverUpload.hasImgUploaded() && bannerImgUpload.hasImgUploaded()) {
                if (this.isEditing) {
                  workApi.save(this.workData.id, this.workData).then(() => {
                    this.gotoListView();
                  });
                } else {
                  workApi.create(this.workData).then(() => {
                    this.gotoListView();
                  });
                }
              }
            });
          }
        });
      },
      gotoListView() {
        this.$router.push({ name: 'works.list' });
      },
      changeEditMode() {
        this.isEditing = true;
        this.prework = JSON.parse(JSON.stringify(this.workData));
      },
      cancelEditMode() {
        this.isEditing = false;
        this.workData = JSON.parse(JSON.stringify(this.prework));
      },
      addCredits() {
        this.work.credits.push({
          job: '',
          name: ''
        });
      },
      removeCredits(index) {
        this.work.credits.splice(index, 1);
      },
      openDialog() {
        this.dialogVisible = true;
        this.newServiceTag = {
          label: '',
          enLabel: ''
        };
      },
      async addServiceTag() {
        await this.$refs.serviceTagForm.validate((valid) => {
          if (valid) {
            serviceTagApi.create(this.newServiceTag).then((data) => {
              this.serviceTagOptions.push({
                value: data.id,
                label: data.label,
                enLabel: data.enLabel
              });
              this.dialogVisible = false;
            });
          }
        });
      }
    }
  };
</script>

<style lang="scss" type="text/scss">
  #works-detail-page {
    .op-breadcrumb {
      margin-bottom: 20px;
    }
    .el-tag+.el-tag {
      margin-left: 10px;
    }
    .button-new-tag, .input-new-tag {
      width: 78px;
      margin-left: 10px;
      height: 24px;
      line-height: 22px;
      padding-top: 0;
      padding-bottom: 0;
      position: relative;
    }
    .input-new-tag {
      .el-input__inner {
        height: 24px;
      }
    }
    .el-row {
      margin-bottom: 10px;
    }
  }
</style>

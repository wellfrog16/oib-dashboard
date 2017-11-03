<template lang="html">
  <div id="works-detail-page">
    <div class="op-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'works.list' }">作品列表</el-breadcrumb-item>
        <el-breadcrumb-item v-if="isCreating">新增作品</el-breadcrumb-item>
        <el-breadcrumb-item v-else>作品详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-form ref="workForm" :model="work" label-width="150px" label-position="left">
        <div v-if="!isInputShown">
          <el-form-item label="ID">
            <el-col :span="8">{{work.id}}</el-col>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-col :span="8">{{work.createdAt}}</el-col>
          </el-form-item>
          <el-form-item label="更新时间">
            <el-col :span="8">{{work.updatedAt}}</el-col>
          </el-form-item>
        </div>
        <el-form-item label="英文版本">
          <el-col :span="8">
            <el-switch
              :disabled="!isInputShown"
              v-model="work.lang"
              on-color="#13ce66"
              off-color="#ff4949"
              on-value="en"
              off-value="zh_cn">
            </el-switch>
          </el-col>
        </el-form-item>
        <el-form-item :label="`是否启用${isEnglish ? '（英文）' : ''}`">
          <el-col :span="8">
            <el-switch
              :disabled="!isInputShown"
              v-model="work.enable"
              on-color="#13ce66"
              off-color="#ff4949"
              :on-value="1"
              :off-value="0">
            </el-switch>
          </el-col>
        </el-form-item>
        <el-form-item :label="`排序序号${isEnglish ? '（英文）' : ''}`">
          <el-col :span="8">
            <el-input v-model="work.sort" v-if="isInputShown" placeholder="请输入排序序号（数字）"></el-input>
            <div v-else>{{work.sort}}</div>
          </el-col>
        </el-form-item>
        <el-form-item :label="`服务品牌${isEnglish ? '（英文）' : ''}`">
          <el-select v-model="work.service" placeholder="请选择">
            <el-option
              v-for="(item, index) in serviceOptions"
              :key="index"
              :label="item.label"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="`作品名称${isEnglish ? '（英文）' : ''}`">
          <el-col :span="8">
            <el-input v-model="work.name" v-if="isInputShown" placeholder="请输入作品名称"></el-input>
            <div v-else>{{work.name}}</div>
          </el-col>
        </el-form-item>
        <el-form-item :label="`封面${isEnglish ? '（英文）' : ''}`">
          <el-col :span="24">
            <op-upload-img
              v-if="isInputShown"
              v-model="work.cover"
              ref="coverUpload"></op-upload-img>
            <img class="preview-img" v-else :src="work.cover">
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
        <el-form-item :label="`Banner图${isEnglish ? '（英文）' : ''}`">
          <el-col :span="24">
            <op-upload-img
              v-if="isInputShown"
              v-model="work.bannerImg"
              ref="bannerImgUpload"></op-upload-img>
            <img class="preview-img" v-else :src="work.bannerImg">
          </el-col>
        </el-form-item>
        <el-form-item :label="`正文${isEnglish ? '（英文）' : ''}`">
          <el-col :span="24">
            <quill-editor v-model="work.contentHTML" ref="myQuillEditor" v-if="isInputShown"></quill-editor>
            <div v-else v-html="work.contentHTML" class="perview-html"></div>
          </el-col>
        </el-form-item>
        <el-form-item :label="`服务标签${isEnglish ? '（英文）' : ''}`">
          <el-tag
            :key="tag"
            v-for="tag in work.tags"
            :closable="true"
            :close-transition="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="mini"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </el-form-item>
        <el-form-item :label="`参与人员${isEnglish ? '（英文）' : ''}`">
          <el-row v-for="(item, index) of work.credits" :key="index">
            <el-col :span="5">
              <el-input placeholder="项目角色" v-model="item.job"></el-input>
            </el-col>
            <el-col :span="5" :push="1">
              <el-input placeholder="人员姓名" v-model="item.name"></el-input>
            </el-col>
            <el-col :span="2" :push="2" v-if="index !== 0">
              <el-button type="danger" size="small" @click="removeCredits(index)"><i class="el-icon-minus"></i></el-button>
            </el-col>
            <el-col :span="4" :push="2" v-if="index == work.credits.length - 1">
              <el-button type="success" size="small" @click="addCredits"><i class="el-icon-plus"></i></el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item :label="`服务栏目${isEnglish ? '（英文）' : ''}`">
          <el-row v-for="(item, index) of work.services" :key="index">
            <el-col :span="7">
              <el-input placeholder="请输入服务栏目" v-model="item.label"></el-input>
            </el-col>
            <el-col :span="2" :push="2" v-if="index !== 0">
              <el-button type="danger" size="small" @click="removeService(index)"><i class="el-icon-minus"></i></el-button>
            </el-col>
            <el-col :span="4" :push="2" v-if="index == work.services.length - 1">
              <el-button type="success" size="small" @click="addService"><i class="el-icon-plus"></i></el-button>
            </el-col>
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
</template>

<script type="text/ecmascript-6" lang="babel">
  import { quillEditor } from 'vue-quill-editor';
  import workApi from '../../../api/work';
  import customerApi from '../../../api/customer';
  import opUploadImg from '../../../components/op-upload-img/index';

  export default {
    data() {
      return {
        isEditing: false,
        isCreating: false,
        work: {
          lang: 'zh_cn',
          name: '',
          bannerImg: '', // string, 头图链接
          contentHTML: '', // string, 正文
          cover: '', // string, 封面链接
          coverText: '', // string, 封面文字
          coverVideoUrl: '', // string, 封面视频地址
          enable: 1, // number, 是否启用，1是 0否
          sort: null,  // number, 排序顺序
          tags: ['标签一', '标签二', '标签三'],
          credits: [{
            job: 'Project Director',
            name: '姜国政/jiang'
          }],
          service: {}, // 品牌
          services: [{
            value: 1,
            label: 'VI设计'
          }]
        },
        prework: {},
        inputVisible: false,
        inputValue: '',
        serviceOptions: [{
          value: '',
          label: ''
        }]
      };
    },
    components: {
      quillEditor,
      opUploadImg
    },
    async created() {
      this.serviceOptions = (await customerApi.list())
        .content.map(item => ({ value: item.id, label: item.name }));
      this.work.service = this.serviceOptions[0];
      const { id } = this.$route.params;
      if (id) {
        this.work = await workApi.get(id);
      } else {
        this.isCreating = true;
      }
    },
    computed: {
      isEnglish() {
        return this.work.lang === 'en';
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
        this.$confirm(`当前编辑的语言版本为（${this.isEnglish ? '英文' : '中文'}）`).then(() => {
          const { coverUpload, bannerImgUpload } = this.$refs;
          // 需用户手动上传封面和banner两张图片
          if (coverUpload.hasImgUploaded() && bannerImgUpload.hasImgUploaded()) {
            if (this.isEditing) {
              workApi.save(this.work.id, this.work).then(() => {
                this.gotoListView();
              });
            } else {
              workApi.create(this.work).then(() => {
                this.gotoListView();
              });
            }
          }
        });
      },
      gotoListView() {
        this.$router.push({ name: 'works.list' });
      },
      changeEditMode() {
        this.isEditing = true;
        Object.assign(this.prework, this.work);
      },
      cancelEditMode() {
        this.isEditing = false;
        Object.assign(this.work, this.prework);
      },
      handleClose(tag) {
        this.work.tags.splice(this.work.tags.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        const { inputValue } = this;
        if (inputValue) {
          this.work.tags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
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
      addService() {
        this.work.services.push({
          value: '',
          label: ''
        });
      },
      removeService(index) {
        this.work.services.splice(index, 1);
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

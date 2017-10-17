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
          <el-form-item label="创建时间">
            <el-col :span="8">{{work.createdAt}}</el-col>
          </el-form-item>
          <el-form-item label="更新时间">
            <el-col :span="8">{{work.updatedAt}}</el-col>
          </el-form-item>
        </div>
        <el-form-item label="是否启用">
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
        <el-form-item label="排序序号">
          <el-col :span="8">
            <el-input v-model="work.sort" v-if="isInputShown" placeholder="请输入排序序号（数字）"></el-input>
            <div v-else>{{work.sort}}</div>
          </el-col>
        </el-form-item>
        <el-form-item label="作品名称">
          <el-col :span="8">
            <el-input v-model="work.name" v-if="isInputShown" placeholder="请输入作品名称"></el-input>
            <div v-else>{{work.name}}</div>
          </el-col>
        </el-form-item>
        <el-form-item label="封面">
          <el-col :span="24">
            <op-upload-img
              v-if="isInputShown"
              v-model="work.cover"
              ref="coverUpload"></op-upload-img>
            <img class="preview-img" v-else :src="work.cover">
          </el-col>
        </el-form-item>
        <el-form-item label="封面文字">
          <el-col :span="8">
            <el-input v-model="work.coverText" v-if="isInputShown" placeholder="请输入封面文字"></el-input>
            <div v-else>{{work.coverText}}</div>
          </el-col>
        </el-form-item>
        <el-form-item label="封面视频地址">
          <el-col :span="8">
            <el-input v-model="work.coverVideoUrl" v-if="isInputShown" placeholder="请输入封面视频链接"></el-input>
            <div v-else>{{work.coverVideoUrl}}</div>
          </el-col>
        </el-form-item>
        <el-form-item label="Banner图">
          <el-col :span="24">
            <op-upload-img
              v-if="isInputShown"
              v-model="work.bannerImg"
              ref="bannerImgUpload"></op-upload-img>
            <img class="preview-img" v-else :src="work.bannerImg">
          </el-col>
        </el-form-item>
        <el-form-item label="正文">
          <el-col :span="24">
            <quill-editor v-model="work.contentHTML" ref="myQuillEditor" v-if="isInputShown"></quill-editor>
            <div v-else v-html="work.contentHTML" class="perview-html"></div>
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
  import workApi from '../../../api/work';
  import opUploadImg from '../../../components/op-upload-img/index';

  export default {
    data() {
      return {
        isEditing: false,
        isCreating: false,
        work: {
          name: '',
          bannerImg: '', // string, 头图链接
          contentHTML: '', // string, 正文
          cover: '', // string, 封面链接
          coverText: '', // string, 封面文字
          coverVideoUrl: '', // string, 封面视频地址
          enable: 1, // number, 是否启用，1是 0否
          sort: null  // number, 排序顺序
        },
        prework: {}
      };
    },
    components: {
      quillEditor,
      opUploadImg
    },
    async created() {
      const { id } = this.$route.params;
      if (id) {
        this.work = await workApi.get(id);
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
      }
    }
  };
</script>

<style lang="scss" type="text/scss">
  #works-detail-page {
    .op-breadcrumb {
      margin-bottom: 20px;
    }
  }
</style>

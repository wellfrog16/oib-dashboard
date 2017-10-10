<template lang="html">
  <div id="works-detail-page">
    <div class="op-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'works.list' }">作品列表</el-breadcrumb-item>
        <el-breadcrumb-item>作品详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-form ref="workForm" :model="work" label-width="150px" label-position="left">
        <el-form-item label="是否启用">
          <el-col :span="8">
            <el-switch
              :disabled="!isEditing"
              v-model="work.enable"
              on-color="#13ce66"
              off-color="#ff4949"
              :on-value="1"
              :off-value="0">
            </el-switch>
          </el-col>
        </el-form-item>
        <el-form-item label="作品名称">
          <el-col :span="8">
            <el-input v-model="work.name" v-if="isEditing"></el-input>
            <div v-else>{{work.name}}</div>
          </el-col>
        </el-form-item>
        <el-form-item label="作品名称（英文）">
          <el-col :span="8">
            <el-input v-model="work.enName" v-if="isEditing"></el-input>
            <div v-else>{{work.enName}}</div>
          </el-col>
        </el-form-item>
        <el-form-item label="封面">
          <el-col :span="24">
            <el-upload
              v-if="isEditing"
              ref="upload"
              class="conver-uploader"
              action="http://www.tron-m.com/oib-api/resource/upload.do"
              :show-file-list="false"
              :on-success="handleConverSuccess"
              :on-change="handleConverChange"
              :auto-upload="false"
              :before-upload="beforeConverUpload">
              <img v-if="localConver" :src="localConver" class="conver">
              <i v-else class="el-icon-plus conver-uploader-icon"></i>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
            </el-upload>
            <img v-else :src="work.conver" class="conver">
          </el-col>
        </el-form-item>
        <el-form-item label="封面文字">
          <el-col :span="8">
            <el-input v-model="work.converText" v-if="isEditing"></el-input>
            <div v-else>{{work.converText}}</div>
          </el-col>
        </el-form-item>
        <el-form-item label="封面文字（英文）">
          <el-col :span="8">
            <el-input v-model="work.enConverText" v-if="isEditing"></el-input>
            <div v-else>{{work.enConverText}}</div>
          </el-col>
        </el-form-item>
        <el-form-item label="封面视频地址">
          <el-col :span="8">
            <el-input v-model="work.converVideoUrl" v-if="isEditing"></el-input>
            <div v-else>{{work.converVideoUrl}}</div>
          </el-col>
        </el-form-item>
        <el-form-item label="正文">
          <el-col :span="24">
            <quill-editor v-model="work.html" ref="myQuillEditor" v-if="isEditing"></quill-editor>
            <div v-else v-html="work.html" class="perview-html"></div>
          </el-col>
        </el-form-item>
        <el-form-item label="正文（英文）">
          <el-col :span="24">
            <quill-editor v-model="work.enHtml" ref="myEnQuillEditor" v-if="isEditing"></quill-editor>
            <div v-else v-html="work.enHtml" class="perview-html"></div>
          </el-col>
        </el-form-item>
        <el-form-item>
          <div v-if="isEditing">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="cancelEditMode">取消</el-button>
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
  import moment from 'moment';
  import { quillEditor } from 'vue-quill-editor';
  import workApi from '../../../api/work';

  export default {
    data() {
      return {
        isEditing: false,
        work: {},
        prework: {},
        localConver: null,
        hasConverChanged: false
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
    async created() {
      const { id } = this.$route.params;
      this.work = await workApi.get({ id });
      this.localConver = this.work.conver;
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      }
    },
    methods: {
      save() {
        if (this.hasConverChanged) {
          this.$refs.upload.submit();
        } else {
          workApi.save(this.work).then(() => {
            this.gotoListView();
          });
        }
      },
      handleConverSuccess(res, files) {
        this.work.conver = `http://www.tron-m.com/oib-api/${res.result[0].url}`;
        workApi.save(this.work).then(() => {
          this.gotoListView();
        });
      },
      handleConverChange(res, files) {
        this.hasConverChanged = true;
        this.localConver = URL.createObjectURL(files[files.length - 1].raw);
      },
      beforeConverUpload(file) {
        console.log(file);
        const isJPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPGOrPNG) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPGOrPNG && isLt2M;
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

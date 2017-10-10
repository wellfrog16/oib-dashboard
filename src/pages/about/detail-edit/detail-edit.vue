<template lang="html">
  <div id="about-detail-edit-page">
    <div>
      <el-form ref="workForm" :model="work" label-width="150px" label-position="left">
        <el-form-item label="是否启用">
          <el-col :span="8">
            <el-switch
              v-model="work.enable"
              on-color="#13ce66"
              off-color="#ff4949">
            </el-switch>
          </el-col>
        </el-form-item>
        <el-form-item label="作品名称">
          <el-col :span="8">
            <el-input v-model="work.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="作品名称（英文）">
          <el-col :span="8">
            <el-input v-model="work.en_name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="封面">
          <el-col :span="24">
            <el-upload
              class="conver-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleConverSuccess"
              :on-change="handleConverChange"
              :auto-upload="false"
              :before-upload="beforeConverUpload">
              <img v-if="work.conver" :src="work.conver" class="conver">
              <i v-else class="el-icon-plus conver-uploader-icon"></i>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
        </el-form-item>
        <el-form-item label="封面文字">
          <el-col :span="8">
            <el-input v-model="work.conver_text"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="封面文字（英文）">
          <el-col :span="8">
            <el-input v-model="work.en_conver_text"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="封面视频地址">
          <el-col :span="8">
            <el-input v-model="work.conver_video_url"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="正文">
          <el-col :span="24">
            <quill-editor v-model="work.html" ref="myQuillEditor"></quill-editor>
          </el-col>
        </el-form-item>
        <el-form-item label="正文（英文）">
          <el-col :span="24">
            <quill-editor v-model="work.en_html" ref="myEnQuillEditor"></quill-editor>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="create">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="perview-html">
      <h2>{{work.name}}</h2>
      <div>{{work.date | formatDate('YYYY-MM-DD HH:mm:ss')}}</div>
      <div v-html="work.html"></div>
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
        work: {
          name: '2017 OIB MOD',
          en_name: '2017 OIB MOD',
          conver: '',
          conver_text: '欧莱雅系列',
          en_conver_text: 'oulaiya',
          html: '<h2>我是例子</h2><div>hahahahaah</div>',
          en_html: '<h2>I am Example</h2><div>hahahahaah</div>',
          conver_video_url: 'http://youku.como',
          enable: true
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
    created() {
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      }
    },
    mounted() {
//      console.log('this is current quill instance object', this.editor);
    },
    methods: {
      create() {
//        console.log('创建');
        workApi.save(this.work).then((data) => {
          console.log('data', data);
        });
      },
      handleConverSuccess(res, files) {
        this.work.conver = URL.createObjectURL(files.pop().raw);
      },
      handleConverChange(res, files) {
        this.work.conver = URL.createObjectURL(files.pop().raw);
      },
      beforeConverUpload(file) {
        console.log(file);
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  };
</script>

<style lang="scss" type="text/scss">
  #about-detail-edit-page {
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

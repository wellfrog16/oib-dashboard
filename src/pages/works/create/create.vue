<template lang="html">
  <div id="works-create-page">
    <div class="op-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'works.list' }">作品列表</el-breadcrumb-item>
        <el-breadcrumb-item>新增作品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-form ref="workForm" :model="work" label-width="150px" label-position="left">
        <el-form-item label="是否启用">
          <el-col :span="8">
            <el-switch
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
            <el-input v-model="work.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="作品名称（英文）">
          <el-col :span="8">
            <el-input v-model="work.enName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="封面">
          <el-col :span="24">
            <el-upload
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
          </el-col>
        </el-form-item>
        <el-form-item label="封面文字">
          <el-col :span="8">
            <el-input v-model="work.converText"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="封面文字（英文）">
          <el-col :span="8">
            <el-input v-model="work.enConverText"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="封面视频地址">
          <el-col :span="8">
            <el-input v-model="work.converVideoUrl"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="正文">
          <el-col :span="24">
            <quill-editor v-model="work.html" ref="myQuillEditor"></quill-editor>
          </el-col>
        </el-form-item>
        <el-form-item label="正文（英文）">
          <el-col :span="24">
            <quill-editor v-model="work.enHtml" ref="myEnQuillEditor"></quill-editor>
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
  import workApi from '../../../api/work';

  export default {
    data() {
      return {
        work: {
          name: '2017 OIB MOD',
          enName: '2017 OIB MOD',
          conver: null,
          converText: '欧莱雅系列',
          enConverText: 'oulaiya',
          html: '<h2>我是例子</h2><div>hahahahaah</div>',
          enHtml: '<h2>I am Example</h2><div>hahahahaah</div>',
          converVideoUrl: 'http://youku.como',
          enable: 1
        },
        localConver: null
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
//        if (this.localConver) {
//          this.$refs.upload.submit();
//        } else {
//          this.$notify.error({
//            title: '新增失败',
//            message: '请先选择封面图片'
//          });
//        }
        workApi.create(this.work).then(() => {
          this.gotoListView();
        });
      },
      handleConverSuccess(res, files) {
        this.work.conver = `http://www.tron-m.com/oib-api/${res.result[0].url}`;
        workApi.create(this.work).then(() => {
          this.gotoListView();
        });
      },
      handleConverChange(res, files) {
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
      }
    }
  };
</script>

<style lang="scss" type="text/scss">
  #works-create-page {
    .op-breadcrumb {
      margin-bottom: 20px;
    }
    .perview-html {
      margin: 20px;
      font-family: HurmeGeometricSans3, Futura, Din, Helvetica Neue, Helvetica, Arial, '思源黑体', Hiragino Sans GB, '华文细黑', STXihei, '微软雅黑', Microsoft yahei, Sans-serif;
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

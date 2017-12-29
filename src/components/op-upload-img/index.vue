<template>
  <div class="op-upload-img">
    <el-upload
      ref="opUpload"
      :action="resourceHost + '/resource/upload.do'"
      :show-file-list="false"
      :on-success="onSuccess"
      :on-change="onChange"
      :auto-upload="autoUpload"
      :before-upload="beforeConverUpload">
      <el-button slot="trigger" size="small" type="primary" :id="imgInputId">上传图片</el-button>
      <el-button :disabled="!isImgChanged" style="margin-left: 10px;" size="small" type="success" @click="submit">{{isImgUploaded ? '已上传' : '上传到服务器'}}</el-button>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过2M</div>
    </el-upload>
    <img v-if="tempImgUrl" class="preview-img" :src="tempImgUrl">
  </div>
</template>
<script type="text/ecmascript-6" lang="babel">
  import { Loading } from 'element-ui';

  let loadingInstancce;
  export default {
    data() {
      return {
        tempImgUrl: this.value,
        isImgChanged: false,
        isImgUploaded: false,
        resourceHost: 'http://test.tron-m.com/oib-api',
        lastFile: '',
        imgInputId: `imgInput_${this._uid}`
      };
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      autoUpload: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      value(value) {
        this.tempImgUrl = value;
      }
    },
    computed: {
      uploader() {
        return this.$refs.opUpload;
      }
    },
    methods: {
      hasImgUploaded() {
        if (!this.tempImgUrl) {
          this.$notify.error({
            message: '请先选择图片'
          });
          return false;
        }
        if (this.isImgChanged && !this.isImgUploaded) {
          this.$notify.error({
            message: '请上传图片至服务器'
          });
          return false;
        }
        return true;
      },
      selectUploadFile() {
        const fileInput = document.getElementById(this.imgInputId);
        fileInput.click();
      },
      submit() {
        loadingInstancce = Loading.service({
          fullscreen: true,
          text: '拼命加载中'
        });
        this.uploader.submit();
      },
      clearFiles() {
        this.uploader.clearFiles();
      },
      onChange(res, files) {
        if (this.lastFile === `${res.name}/${res.size}`) {
          return;
        }
//        loadingInstancce = Loading.service({
//          fullscreen: true,
//          text: '拼命加载中'
//        });
        this.isImgChanged = true;
        this.isImgUploaded = false;
        this.tempImgUrl = URL.createObjectURL(files[files.length - 1].raw);
        this.$emit('change', res, files);
      },
      onSuccess(res, files) {
        this.isImgChanged = false;
        this.isImgUploaded = true;
        if (loadingInstancce) {
          loadingInstancce.close();
        }
        this.$notify.success({
          message: '上传成功'
        });
        this.$emit('input', `${this.resourceHost}/${res.result[0].url}`);
        this.$emit('success', res, files);
      },
      beforeConverUpload(file) {
        if (this.lastFile === `${file.name}/${file.size}`) {
          return false;
        }
        this.lastFile = `${file.name}/${file.size}`;

        const isJPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPGOrPNG) {
          this.$message.error('上传图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPGOrPNG && isLt2M;
      }
    }
  };
</script>
<style lang="scss" type="text/scss">
  .op-upload-img {

  }
</style>

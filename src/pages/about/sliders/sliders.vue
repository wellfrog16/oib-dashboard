<template>
  <el-dialog
    title="修改轮播图"
    :visible.sync="dialogVisible">
    <el-form label-width="150px" label-position="top">
      <el-form-item :label="`第${index + 1}张`" v-for="(item, index) of sliders" :key="index">
        <el-col :span="24">
          <op-upload-img
            v-model="item.value"
            ref="bannerImgUpload"></op-upload-img>
          <el-button type="success" @click="addPicture()" v-if="index == sliders.length - 1">添加图片</el-button>
          <el-button type="danger" @click="removePicture(index)"  v-if="index !== 0">移除图片</el-button>
        </el-col>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script type="text/ecmascript-6" lang="babel">
  import aboutApi from '@/api/about';
  import opUploadImg from '@/components/op-upload-img/index';
  
  export default {
    components: {
      opUploadImg
    },
    data() {
      return {
        dialogVisible: false,
        sliders: [],
        preSliders: []
      };
    },
    async created() {
      this.sliders = ((await aboutApi.getSliders()).sliders || [''])
        .map(item => ({ value: item }));
      this.preSliders = [...this.sliders];
    },
    methods: {
      open() {
        this.dialogVisible = true;
        this.sliders = [...this.preSliders];
      },
      confirm() {
        aboutApi.saveSliders({
          sliders: this.sliders.filter(item => item.value).map(item => item.value)
        }).then(({ sliders }) => {
          this.dialogVisible = false;
          this.sliders = sliders.map(item => ({ value: item }));
          this.preSliders = [...this.sliders];
        });
      },
      cancel() {
        this.dialogVisible = false;
      },
      removePicture(index) {
        this.sliders.splice(index, 1);
      },
      addPicture() {
        this.sliders.push({
          value: ''
        });
      }
    }
  };
</script>
<style lang="scss" type="text/scss">
  .template {
    background-color: #ff0000;
  }
</style>

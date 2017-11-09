<template>
  <el-dialog
    title="修改轮播图"
    :visible.sync="dialogVisible">
    <el-form label-width="150px" label-position="top">
      <el-form-item :label="item.label" v-for="(item, index) of sliders" :key="index">
        <el-col :span="24">
          <op-upload-img
            v-model="item.value"
            ref="bannerImgUpload"></op-upload-img>
          <!--<img class="preview-img" :src="item.value">-->
        </el-col>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script type="text/ecmascript-6" lang="babel">
  import customerApi from '@/api/customer';
  import opUploadImg from '@/components/op-upload-img/index';
  
  export default {
    components: {
      opUploadImg
    },
    data() {
      return {
        dialogVisible: false,
        sliders: ['', '', '', '', '', '']
      };
    },
    async created() {
      this.sliders = ((await customerApi.getSliders()).data.sliders || this.sliders)
        .map((item, index) => ({
          label: `第${index + 1}张`,
          value: item
        }));
    },
    methods: {
      open() {
        this.dialogVisible = true;
      },
      confirm() {
        customerApi.saveSliders({
          sliders: this.sliders.map(item => item.value)
        }).then(() => {
          this.dialogVisible = false;
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

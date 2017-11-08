<template>
  <el-dialog
    title="添加服务标签"
    :visible.sync="dialogVisible">
    <el-form label-width="150px" label-position="top">
      <el-form-item :label="item.label" v-for="(item, index) of sliders" :key="index">
        <el-col :span="24">
          <op-upload-img
            v-model="item.value"
            ref="bannerImgUpload"></op-upload-img>
          <img class="preview-img" :src="item.value">
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
  import opUploadImg from '@/components/op-upload-img/index';
  
  export default {
    components: {
      opUploadImg
    },
    data() {
      return {
        dialogVisible: false,
        sliders: [{
          label: '第一张',
          value: ''
        }, {
          label: '第二张',
          value: ''
        }, {
          label: '第三张',
          value: ''
        }, {
          label: '第四张',
          value: ''
        }, {
          label: '第五张',
          value: ''
        }, {
          label: '第六张',
          value: ''
        }]
      };
    },
    methods: {
      open() {
        this.dialogVisible = true;
      },
      confirm() {
      }
    }
  };
</script>
<style lang="scss" type="text/scss">
  .template {
    background-color: #ff0000;
  }
</style>

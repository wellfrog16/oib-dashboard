<template>
  <div class="op-quill-editor">
    <quill-editor v-model="content" ref="myQuillEditor" @focus="onEditorFocus($event)" @change="onEditorChange($event)"></quill-editor>
    <div class="limit">当前已输入 <span>{{nowLength}}</span> 个字符，您还可以输入 <span>{{SurplusLength}}</span> 个字符。</div>
    <op-upload-img
    style="display: none;"
    v-model="imgUrl"
    :auto-upload="true"
    ref="myImgUpload"></op-upload-img>
  </div>
</template>
<script type="text/ecmascript-6" lang="babel">
  import { quillEditor, Quill } from 'vue-quill-editor';
  import opUploadImg from '../op-upload-img/index';

  export default {
    data() {
      return {
        addRange: [],
        uploadType: '',
        imgUrl: '',
        textLength: 0
      };
    },
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    watch: {
      imgUrl(value) {
        if (value !== null && value.length > 0) {
          this.addRange = this.editor.getSelection();
          // 调用编辑器的insertEmbed方法，插入url
          this.editor.insertEmbed(
            this.addRange !== null ? this.addRange.index : 0,
            this.uploadType,
            value,
            Quill.sources.USER);
        } else {
          this.$message.error(`${this.uploadType}插入失败`);
        }
        // 清除input的内容
        this.uploader.clearFiles();
      }
    },
    components: {
      quillEditor,
      opUploadImg
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      },
      uploader() {
        return this.$refs.myImgUpload;
      },
      nowLength() {
        return this.textLength;
      },
      SurplusLength() {
        const num = 10000 - Number(this.nowLength);
        return num || 0;
      },
      content: {
        get: function () {
          return this.value;
        },
        set: function (value) {
          this.$emit('input', value);
        }
      }
    },
    // 页面加载后执行，为编辑器的图片icon绑定点击事件
    mounted() {
      // 为图片Icon绑定事件，getModule为编辑器的内部属性
      this.editor.getModule('toolbar').addHandler('image', this.imgHandler);
    },
    methods: {
      imgHandler(state) {
        this.addRange = this.editor.getSelection();
        if (state) {
          this.uploader.selectUploadFile();
        }
        this.uploadType = 'image';
      },
      onEditorFocus(editor) {
        editor.enable(true);  // 实现达到上限字符可删除
      },
      onEditorChange({ editor, html, text }) {
        this.textLength = text.length;
        if (this.textLength > 10000) {
          this.$message.error('最多输入10000个字符');
          editor.enable(false);
        }
      }
    }
  };
</script>
<style lang="scss" type="text/scss">
  .template {
    background-color: #ff0000;
  }
</style>
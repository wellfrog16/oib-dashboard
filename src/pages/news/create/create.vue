<template lang="html">
  <div id="news-create-page">
    <div class="op-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'news.list' }">新闻列表</el-breadcrumb-item>
        <el-breadcrumb-item>新增新闻</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-form ref="newsForm" :model="news" label-width="150px" label-position="left">
        <el-form-item label="是否启用">
          <el-col :span="8">
            <el-switch
              v-model="news.enable"
              on-color="#13ce66"
              off-color="#ff4949"
              :on-value="1"
              :off-value="0">
            </el-switch>
          </el-col>
        </el-form-item>
        <el-form-item label="新闻标题">
          <el-col :span="8">
            <el-input v-model="news.title"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="新闻标题（英文）">
          <el-col :span="8">
            <el-input v-model="news.enTitle"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="正文">
          <el-col :span="24">
            <quill-editor v-model="news.html" ref="myQuillEditor"></quill-editor>
          </el-col>
        </el-form-item>
        <el-form-item label="正文（英文）">
          <el-col :span="24">
            <quill-editor v-model="news.enHtml" ref="myEnQuillEditor"></quill-editor>
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
  import newsApi from '../../../api/news';

  export default {
    data() {
      return {
        news: {
          title: '2017 OIB MOD',
          enTitle: '2017 OIB MOD',
          html: '<h2>我是例子</h2><div>hahahahaah</div>',
          enHtml: '<h2>I am Example</h2><div>hahahahaah</div>',
          enable: 1
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
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      }
    },
    methods: {
      create() {
        newsApi.save(this.news).then(() => {
          this.gotoListView();
        });
      },
      gotoListView() {
        this.$router.push({ name: 'news.list' });
      }
    }
  };
</script>

<style lang="scss" type="text/scss">
  #news-create-page {
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

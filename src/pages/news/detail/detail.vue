<template lang="html">
  <div id="news-detail-page">
    <div class="op-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'news.list' }">新闻列表</el-breadcrumb-item>
        <el-breadcrumb-item>新闻详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-form ref="newsForm" :model="news" label-width="150px" label-position="left">
        <el-form-item label="是否启用">
          <el-col :span="8">
            <el-switch
              :disabled="!isEditing"
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
            <el-input v-model="news.title" v-if="isEditing"></el-input>
            <div v-else>{{news.title}}</div>
          </el-col>
        </el-form-item>
        <el-form-item label="新闻标题（英文）">
          <el-col :span="8">
            <el-input v-model="news.enTitle" v-if="isEditing"></el-input>
            <div v-else>{{news.enTitle}}</div>
          </el-col>
        </el-form-item>
        <el-form-item label="正文">
          <el-col :span="24">
            <quill-editor v-model="news.html" ref="myQuillEditor" v-if="isEditing"></quill-editor>
            <div v-else v-html="news.html" class="perview-html"></div>
          </el-col>
        </el-form-item>
        <el-form-item label="正文（英文）">
          <el-col :span="24">
            <quill-editor v-model="news.enHtml" ref="myEnQuillEditor" v-if="isEditing"></quill-editor>
            <div v-else v-html="news.enHtml" class="perview-html"></div>
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
    <!--<div class="perview-html">-->
      <!--<h2>{{news.title}}</h2>-->
      <!--<div v-html="news.html"></div>-->
    <!--</div>-->
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  import moment from 'moment';
  import { quillEditor } from 'vue-quill-editor';
  import newsApi from '../../../api/news';

  export default {
    data() {
      return {
        isEditing: false,
        news: {
          title: '2017 OIB MOD',
          enTitle: '2017 OIB MOD',
          html: '<h2>我是例子</h2><div>hahahahaah</div>',
          enHtml: '<h2>I am Example</h2><div>hahahahaah</div>',
          enable: 1
        },
        preNews: {}
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
      this.news = await newsApi.get({ id });
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      }
    },
    methods: {
      save() {
        newsApi.save(this.news).then(() => {
          this.gotoListView();
        });
      },
      gotoListView() {
        this.$router.push({ name: 'news.list' });
      },
      changeEditMode() {
        this.isEditing = true;
        Object.assign(this.preNews, this.news);
      },
      cancelEditMode() {
        this.isEditing = false;
        Object.assign(this.news, this.preNews);
      }
    }
  };
</script>

<style lang="scss" type="text/scss">
  #news-detail-page {
    .op-breadcrumb {
      margin-bottom: 20px;
    }
    /*.perview-html {*/
      /*margin: 20px;*/
    /*}*/
  
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

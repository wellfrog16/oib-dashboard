<template lang="html">
  <div id="news-detail-page">
    <div class="op-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'news.list' }">新闻列表</el-breadcrumb-item>
        <el-breadcrumb-item v-if="isCreating">新增新闻</el-breadcrumb-item>
        <el-breadcrumb-item v-else>新闻详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-form ref="newsForm" :model="news" label-width="150px" label-position="left">
        <div v-if="!isInputShown">
          <el-form-item label="ID">
            <el-col :span="8">{{newsData.id}}</el-col>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-col :span="8">{{newsData.createdAt}}</el-col>
          </el-form-item>
          <el-form-item label="更新时间">
            <el-col :span="8">{{newsData.updatedAt}}</el-col>
          </el-form-item>
        </div>
        <el-form-item label="是否启用">
          <el-col :span="8">
            <el-switch
              :disabled="!isInputShown"
              v-model="newsData.enable"
              on-color="#13ce66"
              off-color="#ff4949"
              :on-value="1"
              :off-value="0">
            </el-switch>
          </el-col>
        </el-form-item>
        <el-form-item label="排序序号">
          <el-col :span="8">
            <el-input v-model="newsData.sort" v-if="isInputShown" placeholder="请输入排序序号（数字）"></el-input>
            <div v-else>{{newsData.sort}}</div>
          </el-col>
        </el-form-item>
        <el-form-item label="Banner图">
          <el-col :span="12">
            <op-upload-img
              v-if="isInputShown"
              v-model="newsData.bannerImg"
              ref="bannerImgUpload"></op-upload-img>
            <img class="preview-img" v-else :src="newsData.bannerImg">
          </el-col>
        </el-form-item>
        <el-form-item label="英文版本">
          <el-col :span="8">
            <el-switch
              :disabled="!isInputShown"
              v-model="lang"
              on-color="#13ce66"
              off-color="#ff4949"
              on-value="en"
              off-value="zh_cn">
            </el-switch>
          </el-col>
        </el-form-item>
        <el-form-item :label="`新闻标题${isEnglish ? '（英文）' : ''}`">
          <el-col :span="8">
            <el-input v-model="news.title" v-if="isInputShown" placeholder="请输入作品名称"></el-input>
            <div v-else>{{news.title}}</div>
          </el-col>
        </el-form-item>
        <el-form-item :label="`正文${isEnglish ? '（英文）' : ''}`">
          <el-col :span="24">
            <op-quill-editor v-model="news.contentHTML" ref="myQuillEditor" v-if="isInputShown"></op-quill-editor>
            <div v-else v-html="news.contentHTML" class="perview-html"></div>
          </el-col>
        </el-form-item>
        <el-form-item :label="`附加${isEnglish ? '（英文）' : ''}`">
          <el-row v-for="(item, index) of news.additions" :key="index">
            <el-col :span="5">
              <el-input v-if="isInputShown" placeholder="标题" v-model="item.title"></el-input>
              <div v-else>{{item.title}}</div>
            </el-col>
            <el-col :span="5" :push="1">
              <el-input v-if="isInputShown" placeholder="内容" v-model="item.content"></el-input>
              <div v-else>{{item.content}}</div>
            </el-col>
            <el-col :span="5" :push="2">
              <el-input v-if="isInputShown" placeholder="链接" v-model="item.link"></el-input>
              <div v-else>{{item.link}}</div>
            </el-col>
            <el-col :span="2" :push="3" v-if="isInputShown">
              <el-button type="danger" size="small" @click="removeAdditions(index)"><i class="el-icon-minus"></i></el-button>
            </el-col>
          </el-row>
          <el-col :span="4" v-if="isInputShown">
            <el-button type="success" size="small" @click="addAdditions"><i class="el-icon-plus"></i></el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
          <div v-if="isEditing">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="cancelEditMode">取消</el-button>
          </div>
          <div v-else-if="isCreating">
            <el-button type="primary" @click="save">新增</el-button>
            <el-button @click="gotoListView">取消</el-button>
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
  import Vue from 'vue';
  import newsApi from '../../../api/news';
  import opUploadImg from '../../../components/op-upload-img/index';

  const defaultNewsData = {
    title: '',
    contentHTML: '', // string, 正文
    additions: [{ // 附加
      title: '',
      content: '',
      link: ''
    }]
  };
  export default {
    data() {
      return {
        isEditing: false,
        isCreating: false,
        newsData: {
          bannerImg: '', // string, 头图链接
          zh_cn: Object.assign({}, defaultNewsData),
          enable: 1, // number, 是否启用，1是 0否
          sort: null  // number, 排序顺序
        },
        lang: 'zh_cn',
        prenewsData: {}
      };
    },
    components: {
      opUploadImg
    },
    async created() {
      const { id } = this.$route.params;
      if (id) {
        this.newsData = await newsApi.get(id);
      } else {
        this.isCreating = true;
      }
    },
    computed: {
      news() {
        if (!this.newsData[this.lang]) {
          this.newsData[this.lang] = defaultNewsData;
        }
        if (!this.newsData[this.lang].additions) {
          Vue.set(this.newsData[this.lang], 'additions', [{
            title: '',
            content: '',
            link: ''
          }]);
        }
        return this.newsData[this.lang];
      },
      isEnglish() {
        return this.lang === 'en';
      },
      isInputShown() {
        return this.isEditing || this.isCreating;
      },
      editor() {
        return this.$refs.myQuillEditor.quill;
      }
    },
    methods: {
      save() {
        this.$confirm(`当前编辑的语言版本为（${this.isEnglish ? '英文' : '中文'}），确认保存吗？`).then(() => {
          const { bannerImgUpload } = this.$refs;
          // 需用户手动上传封面和banner两张图片
          if (bannerImgUpload.hasImgUploaded()) {
            if (this.isEditing) {
              newsApi.save(this.newsData.id, this.newsData).then(() => {
                this.gotoListView();
              });
            } else {
              newsApi.create(this.newsData).then(() => {
                this.gotoListView();
              });
            }
          }
        });
      },
      gotoListView() {
        this.$router.push({ name: 'news.list' });
      },
      changeEditMode() {
        this.isEditing = true;
        this.lang = 'zh_cn';
        this.prenewsData = JSON.parse(JSON.stringify(this.newsData));
      },
      cancelEditMode() {
        this.isEditing = false;
        this.lang = 'zh_cn';
        this.newsData = JSON.parse(JSON.stringify(this.prenewsData));
      },
      addAdditions() {
        this.news.additions.push({
          title: '',
          content: '',
          link: ''
        });
      },
      removeAdditions(index) {
        this.news.additions.splice(index, 1);
      },
    }
  };
</script>

<style lang="scss" type="text/scss">
  #news-detail-page {
    .op-breadcrumb {
      margin-bottom: 20px;
    }
  }
</style>

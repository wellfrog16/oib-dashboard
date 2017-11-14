<template lang="html">
  <div id="abouts-detail-page">
    <div class="op-breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>关于我们</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-button type="primary" class="create-button" @click="showSlidersDialog">修改轮播图</el-button>
      <el-form ref="aboutForm" :model="about" label-width="150px" label-position="left">
        <div v-if="!isEditing">
          <el-form-item label="更新时间">
            <el-col :span="8">{{about.updatedAt}}</el-col>
          </el-form-item>
        </div>
        <el-form-item label="英文版本">
          <el-col :span="8">
            <el-switch
              :disabled="!isEditing"
              v-model="lang"
              on-color="#13ce66"
              off-color="#ff4949"
              on-value="en"
              off-value="zh_cn">
            </el-switch>
          </el-col>
        </el-form-item>
        <!--<el-form-item label="轮播图">-->
          <!--<el-col :span="24">-->
            <!--<op-upload-img-->
              <!--v-if="isEditing"-->
              <!--v-model="about.bannerImg"-->
              <!--ref="bannerImgUpload"></op-upload-img>-->
            <!--<img class="preview-img" v-else :src="about.bannerImg">-->
          <!--</el-col>-->
        <!--</el-form-item>-->
        <el-form-item :label="`公司简介${isEnglish ? '（英文）' : ''}`">
          <el-col :span="24">
            <quill-editor v-model="about.introductionHTML" ref="introductionHTMLQuillEditor" v-if="isEditing"></quill-editor>
            <div v-else v-html="about.introductionHTML" class="perview-html"></div>
          </el-col>
        </el-form-item>
        <el-form-item :label="`业务板块${isEnglish ? '（英文）' : ''}`">
          <el-col :span="24">
            <quill-editor v-model="about.serviceHTML" ref="serviceHTMLQuillEditor" v-if="isEditing"></quill-editor>
            <div v-else v-html="about.serviceHTML" class="perview-html"></div>
          </el-col>
        </el-form-item>
        <el-form-item :label="`公司组织${isEnglish ? '（英文）' : ''}`">
          <el-col :span="24">
            <quill-editor v-model="about.compositionHTML" ref="compositionHTMLQuillEditor" v-if="isEditing"></quill-editor>
            <div v-else v-html="about.compositionHTML" class="perview-html"></div>
          </el-col>
        </el-form-item>
        <el-form-item :label="`合作伙伴${isEnglish ? '（英文）' : ''}`">
          <el-col :span="24">
            <quill-editor v-model="about.parterHTML" ref="parterHTMLQuillEditor" v-if="isEditing"></quill-editor>
            <div v-else v-html="about.parterHTML" class="perview-html"></div>
          </el-col>
        </el-form-item>
        <el-form-item :label="`服务理念${isEnglish ? '（英文）' : ''}`">
          <el-col :span="24">
            <quill-editor v-model="about.philosophyHTML" ref="philosophyHTMLQuillEditor" v-if="isEditing"></quill-editor>
            <div v-else v-html="about.philosophyHTML" class="perview-html"></div>
          </el-col>
        </el-form-item>
        <el-form-item :label="`服务客户${isEnglish ? '（英文）' : ''}`">
          <el-col :span="24">
            <quill-editor v-model="about.clientsHTML" ref="clientsHTMLQuillEditor" v-if="isEditing"></quill-editor>
            <div v-else v-html="about.clientsHTML " class="perview-html"></div>
          </el-col>
        </el-form-item>
        <el-form-item :label="`独立IP${isEnglish ? '（英文）' : ''}`">
          <el-col :span="24">
            <quill-editor v-model="about.ipHTML" ref="ipHTMLQuillEditor" v-if="isEditing"></quill-editor>
            <div v-else v-html="about.ipHTML " class="perview-html"></div>
          </el-col>
        </el-form-item>
        <el-form-item :label="`公司愿景${isEnglish ? '（英文）' : ''}`">
          <el-col :span="24">
            <quill-editor v-model="about.visionHTML" ref="visionHTMLQuillEditor" v-if="isEditing"></quill-editor>
            <div v-else v-html="about.visionHTML " class="perview-html"></div>
          </el-col>
        </el-form-item>
        <el-form-item :label="`奖项${isEnglish ? '（英文）' : ''}`">
          <el-form :model="award" v-for="(award, index) of about.awards" :key="index" label-width="80px">
            <el-form-item label="名称" style="margin-bottom: 10px;">
              <el-col :span="8">
                <el-input v-model="award.title" v-if="isEditing" placeholder="请输入奖项名称"></el-input>
                <div v-else>{{award.title}}</div>
              </el-col>
            </el-form-item>
            <el-form-item label="类别" style="margin-bottom: 10px;">
              <el-col :span="8">
                <el-input v-model="award.category" v-if="isEditing" placeholder="请输入奖项类别"></el-input>
                <div v-else>{{award.category}}</div>
              </el-col>
            </el-form-item>
            <el-form-item label="颁奖机构" style="margin-bottom: 10px;">
              <el-col :span="8">
                <el-input v-model="award.institution" v-if="isEditing" placeholder="请输入颁奖机构"></el-input>
                <div v-else>{{award.institution}}</div>
              </el-col>
              <el-col :span="4" >
                <el-button type="primary" icon="delete"></el-button>
              </el-col>
            </el-form-item>
          </el-form>
        </el-form-item>
        <el-form-item>
          <div v-if="isEditing">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="cancelEditMode">取消</el-button>
          </div>
          <div v-else>
            <el-button type="primary" @click="changeEditMode">编辑</el-button>
            <!--<el-button @click="cancelEditMode">返回</el-button>-->
          </div>
        </el-form-item>
      </el-form>
    </div>
  
    <sliders ref="sliders"></sliders>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  import { quillEditor } from 'vue-quill-editor';
  import aboutApi from '../../../api/about';
  import opUploadImg from '../../../components/op-upload-img/index';
  import sliders from '../sliders/sliders';

  const defaultAboutData = {
    swipers: [{
      imgUrl: '' // string, 轮播图链接
    }],
    introductionHTML: '<div>公司简介</div>', // 公司简介
    serviceHTML: '<div>业务板块</div>', // 业务板块
    compositionHTML: '<div>公司组织</div>', // 公司组织
    parterHTML: '<div>合作伙伴</div>', // 合作伙伴
    philosophyHTML: '<div>服务理念</div>', // 服务理念
    clientsHTML: '<div>服务客户</div>', // 服务客户
    ipHTML: '<div>独立IP</div>', // 独立IP
    visionHTML: '<div>公司愿景</div>', // 公司愿景
    awards: [{ // 奖项
      title: '2014 PENTAWARDS - BRONZE', // 名称
      category: 'LUXURY', // 类别
      institution: 'CMM - MING CREAM DESIGN' // 颁奖机构
    }, { // 奖项
      title: '2014 PENTAWARDS - BRONZE', // 名称
      category: 'LUXURY', // 类别
      institution: 'CMM - MING CREAM DESIGN' // 颁奖机构
    }],
    people: [{
      avatar: './asset/img/about/wuzhigang.jpg',
      name: '吴志刚',
      title: 'OIB总经理',
      intro: '曾任上市公司、知名企业总经理、市场总监等职，并同时担任中国百货商业协会洗涤化妆品分会副秘书长、中国化妆品市场营销中心副主任、《化妆品观察》、《中国美妆》主笔，《中国化妆品》、《日用化学工业》、《日用化学品科学》编委。曾获中国杰出营销人金鼎奖、中国广告长城奖、中国化妆品营销十大策划人等荣誉。2013年创立广州吴志刚品牌策划有限公司，后与上海念相设计等企业共同组建集团公司OIB。'
    }]
  };

  export default {
    data() {
      return {
        isEditing: false,
        lang: 'zh_cn',
        aboutData: {
          zh_cn: Object.assign({}, defaultAboutData)
        },
        preabout: {}
      };
    },
    components: {
      quillEditor,
      opUploadImg,
      sliders
    },
    async created() {
      this.aboutData = await aboutApi.get() || this.aboutData;
      console.log('fff', this.aboutData);
    },
    computed: {
      about() {
        this.aboutData[this.lang] = this.aboutData[this.lang] || defaultAboutData;
        return this.aboutData[this.lang];
      },
      isEnglish() {
        return this.lang === 'en';
      },
      editor() {
        return this.$refs.myQuillEditor.quill;
      }
    },
    methods: {
      showSlidersDialog() {
        this.$refs.sliders.open();
      },
      save() {
        aboutApi.save(this.aboutData).then((data) => {
          this.aboutData = data;
          this.cancelEditMode();
        });
      },
      changeEditMode() {
        this.isEditing = true;
        Object.assign(this.preabout, this.aboutData);
      },
      cancelEditMode() {
        this.isEditing = false;
        Object.assign(this.aboutData, this.preabout);
      }
    }
  };
</script>

<style lang="scss" type="text/scss">
  #abouts-detail-page {
    .op-breadcrumb {
      margin-bottom: 20px;
    }
  }
</style>

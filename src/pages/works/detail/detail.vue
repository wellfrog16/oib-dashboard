<template lang="html">
  <div id="works-detail-page">
    <div>
      <el-form ref="workForm" :model="work" label-width="80px">
        <el-form-item label="项目名称">
          <el-input v-model="work.name"></el-input>
        </el-form-item>
        <el-form-item label="项目时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="work.date" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <quill-editor v-model="work.content" ref="myQuillEditor"></quill-editor>
    </div>
    <div class="perview-html">
      <h2>{{work.name}}</h2>
      <div>{{work.date | formatDate('YYYY-MM-DD HH:mm:ss')}}</div>
      <div v-html="work.content"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  import moment from 'moment';
  import { quillEditor } from 'vue-quill-editor';
  
  export default {
    data() {
      return {
        work: {
          name: '',
          date: '',
          content: '<h2>I am Example</h2>'
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
    created() {
      this.work = {
        name: '2017 OIB MOD',
        date: '2017-10-2',
        content: '<h2>I am Example</h2><div>hahahahaah</div>'
      };
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      }
    },
    mounted() {
//      console.log('this is current quill instance object', this.editor);
    },
    methods: {
    }
  };
</script>

<style lang="scss" type="text/scss">
  #works-detail-page {
    .perview-html {
      margin: 20px;
    }
  }
</style>

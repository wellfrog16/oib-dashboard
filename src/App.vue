<template>
  <div class="db">
    <template v-if="!$route.meta.hidden">
      <header class="db-header">
        <router-link class="logo" :to="{ path: '/works/list' }">OIB Dashboard</router-link>
        <div class="user-info" v-if="user.id">
          <span v-text="user.username"></span>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <img :src="user.avatar">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </header>
      <div class="db-body">
        <aside class="db-menu-wrapper">
          <el-menu :default-active="activeMenu" class="db-menu-bar" router>
            <div v-for="(item, index) in menuConfig" :key="index">
              <template v-if="item.children && item.label">
                <el-submenu :index="item.index">
                  <template slot="title">
                    <i :class="item.iconClass"></i>{{item.label}}
                  </template>
                  <el-menu-item :index="cItem.index" v-for="(cItem, cIndex) in item.children" :key="cIndex" :route="cItem.route">{{cItem.label}}</el-menu-item>
                </el-submenu>
              </template>
              
              <template v-if="!item.children && item.label">
                <el-menu-item :index="item.index" :route="item.route">
                  <i :class="item.iconClass"></i>{{item.label}}
                </el-menu-item>
              </template>
            </div>
          </el-menu>
        </aside>
        
        <div class="db-content-wrapper">
          <section class="db-content">
            <router-view></router-view>
          </section>
        </div>
      </div>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  import menuConfig from './menuConfig';
  
  export default {
    name: 'app',
    data() {
      return {
        user: {
          id: '',
          username: '',
          avatar: ''
        },
        activeMenu: '',
        menuConfig
      };
    },
    created() {
      this.activeMenu = this.$route.meta.index;
      this.user = JSON.parse(localStorage.getItem('user'));
    },
    watch: {
      $route(to, from) {
        this.activeMenu = this.$route.meta.index;
        this.user = JSON.parse(localStorage.getItem('user'));
      }
    },
    methods: {
      logout() {
        this.$confirm('确定要注销吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          localStorage.removeItem('user');
          this.$router.push({ path: '/login' });
        }).catch(() => {});
      }
    }
  };
</script>

<style lang="scss" type="text/scss">
  .db {
    .el-dropdown-menu {
      margin-top: 20px;
    }
    // header
    .db-header {
      width: 100%;
      height: 60px;
      background: #20A0FF;
      padding: 13px 20px;
      box-sizing: border-box;
      color: #ffffff;
      z-index: 99;
      position: fixed;
      left: 0;
      top: 0;
      
      .logo {
        font-size: 2.4rem;
      }
      
      .user-info {
        float: right;
        
        img {
          width: 25px;
          height: 25px;
          vertical-align: -7px;
          margin: 0 0 0 10px;
          cursor: pointer;
        }
      }
    }
    // body
    .db-body {
      // menu
      .db-menu-wrapper {
        position: fixed;
        left: 0;
        top: 60px;
        background: #f5f5f5;
        height: 100%;
        overflow: auto;
        z-index: 98;
        
        .db-menu-bar {
          height: 100%;
          flex-grow: 0;
          width: 200px;
        }
      }
      // content
      .db-content-wrapper {
        width: 100%;
        z-index: 97;
        box-sizing: border-box;
        padding: 60px 0 0 200px;
        
        .db-content {
          padding: 25px;
          
          .db-content-inner {
            padding: 30px 0;
          }
        }
      }
    }
  }
</style>

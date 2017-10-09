export default [{
  label: '首页',
  iconClass: 'el-icon-message',
  index: 'index',
  children: [{
    label: '列表',
    index: 'index',
    route: { name: 'index.list' }
  }]
}, {
  label: '作品',
  iconClass: 'el-icon-message',
  index: 'works',
  children: [{
    label: '列表',
    index: 'works',
    route: { name: 'works.list' }
  }]
}, {
  label: '关于我们',
  iconClass: 'el-icon-message',
  index: 'about',
  children: [{
    label: '列表',
    index: 'about',
    route: { name: 'about.list' }
  }]
}, {
  label: '新闻',
  iconClass: 'el-icon-message',
  index: 'news',
  children: [{
    label: '列表',
    index: 'news',
    route: { name: 'news.list' }
  }]
}, {
  label: '客户',
  iconClass: 'el-icon-message',
  index: 'customers',
  children: [{
    label: '列表',
    index: 'customers',
    route: { name: 'customers.list' }
  }]
}, {
  label: '联系我们',
  iconClass: 'el-icon-message',
  index: 'contact',
  children: [{
    label: '列表',
    index: 'contact',
    route: { name: 'contact.list' }
  }]
}];

// sitemap.js
const Sitemap = require('react-router-sitemap').default;

function generateSitemap() {
  // 基础 URL，替换为你的域名
  const baseUrl = 'https://trans.consve.com';

  // 路由路径列表
  const paths = [
    '/' // 单页面的路径
  ];

  // 生成 sitemap
  return new Sitemap(paths)
    .build(baseUrl)
    .save('./dist/sitemap.xml'); // 输出到 public 文件夹
}

generateSitemap();
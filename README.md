# Matt Pocock · 工程工作流指南

独立网站仓库：产品介绍、架构设计、Codex 使用指南与公开下载。

- [网站首页](https://ww880412.github.io/matt-pocock-guide/)
- [架构设计](https://ww880412.github.io/matt-pocock-guide/architecture.html)
- [使用指南](https://ww880412.github.io/matt-pocock-guide/guide.html)
- [下载插件](https://ww880412.github.io/matt-pocock-guide/downloads/matt-pocock-codex.zip)
- [插件项目](https://github.com/ww880412/matt-pocock-plugins)

## 维护与发布

纯 HTML、CSS 与浏览器 JavaScript，无服务端、无构建依赖。
GitHub Pages 从 main 分支根目录发布；.nojekyll 禁用 Jekyll 转换。
更新页面并推送 main 后，GitHub 自动部署。

网站维护内容也保存在插件项目的 docs/site/。发布时仅同步这里的三个页面、CSS、JS 和明确的公开下载文件，不复制项目工作材料或运行记录。

## 下载版本

当前 ZIP 为 0.1.0-native.14-rc.1+codex.20260913，保持既有发布包的原始字节。
SHA-256：86e98dbaba797651564542350fd969449ff683b6359efdb34ceb4567879e9b8f

网站迁移不会更新已安装插件，也不改变既有包内的网站链接；包内入口随后续版本更新。下载包中的许可证与来源说明保持原样。

## 来源与边界

工程方法来自 Matt Pocock，流程设计借鉴 Pi Matt；本地跨宿主实现与验收范围见网站。
网站发布不代表新的真人验收或新增通用 SDK 能力。

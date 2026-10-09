<div align="center">

# Matt Pocock · 工程工作流

**让 Agent 的下一步，有状态，有依据。**

将工程方法、任务状态与关键决定，接入 Codex、Claude Code 与 Devin CLI 的工作过程；各宿主分别发布和验收。

**简体中文** · [English](README.en.md)

[产品主页](https://ww880412.github.io/matt-pocock-guide/) · [架构设计](https://ww880412.github.io/matt-pocock-guide/architecture.html) · [使用指南](https://ww880412.github.io/matt-pocock-guide/guide.html) · [下载 Codex 插件](https://ww880412.github.io/matt-pocock-guide/downloads/matt-pocock-codex.zip) · [下载 Devin 插件](https://ww880412.github.io/matt-pocock-guide/downloads/matt-pocock-devin.zip) · [下载 Claude 插件](https://ww880412.github.io/matt-pocock-guide/downloads/matt-pocock-claude.zip)

</div>

---

## 从一句需求，到可追踪的工程过程

长任务需要保留的不只是聊天上下文，还有当前路线、尚未解决的要求、人的关键选择，以及已经发生过的状态变化。Matt 把这些信息组织为任务自己的 **Harness**：模型负责专业判断，程序检查可验证的规则，人保留目标与授权。

```text
讨论需求 → 写出规格 → 拆解任务 → 实现与验证 → 评审
              任务状态、要求与关键答复贯穿过程
```

| 你需要做的事 | Matt 提供的支撑 |
| --- | --- |
| 把想法推进到实现 | 五条工程路线，连接讨论、规格、任务、实现与评审 |
| 只完成一个明确动作 | Codex 已发布38项能力，支持独立调用和任务推荐 |
| 中断后继续长任务 | 会话事件、来源核对与恢复规则，区分进行中和终态 |
| 在关键位置让人决定 | 原生问题关联与答复来源核验，不接受模型代填答案 |
| 保留方法的完整上下文 | 按声明加载方法正文与支撑资料，校验固定资源 |

## 看懂架构，也看见流向

[![Matt 双层 Harness 架构预览：宿主执行环境、任务核心、状态与答复记录](assets/architecture-preview.png)](https://ww880412.github.io/matt-pocock-guide/harness-map.html)

**[打开 Archify 动态架构图 →](https://ww880412.github.io/matt-pocock-guide/harness-map.html)**

选择 **控制流 / 状态流 / 答复凭据流**，逐步播放章节；支持节点聚焦、缩放、浅深主题与图像导出。README 展示静态预览，完整交互在 GitHub Pages 中运行。动画说明图中关系，不是实时执行日志。

[架构设计页](https://ww880412.github.io/matt-pocock-guide/architecture.html)进一步解释三个真实设计问题：旧状态如何恢复、迟到答案如何隔离、状态已写入但正文未送达时如何补送。

## 宿主支持与获取

| 宿主 | 当前状态 | 获取方式与限制 |
| --- | --- | --- |
| Codex | 已发布 native.23，38 项能力 | 下方公开 ZIP；包含整规格实施、复盘与完整能力咨询 |
| Devin CLI | 已发布 `0.1.2+devin.20261009`，38 项能力及完整能力咨询 | [独立 ZIP](https://ww880412.github.io/matt-pocock-guide/downloads/matt-pocock-devin.zip)；交互问答使用 TTY |
| Claude Code | 已发布 `0.1.1`，38项能力 | [独立 ZIP](https://ww880412.github.io/matt-pocock-guide/downloads/matt-pocock-claude.zip)；2.1.284的13项功能验收通过，真人体验与业务效果未外推 |

Devin 的 ACP/print 在已测环境没有作答通道，问题自动取消且无业务答案。本机 TTY 与限定精确提交中断恢复已验；首次自动重放可能因可信会话校验失败而需要新一次调用，恢复后的回执不重复。跨设备身份与真人 U 未验证。详见[宿主支持说明](https://ww880412.github.io/matt-pocock-guide/guide.html#hosts)。

## 开始使用

Claude Code用户[下载独立包](https://ww880412.github.io/matt-pocock-guide/downloads/matt-pocock-claude.zip)并核对包内校验值，解压到稳定目录后运行 `claude --plugin-dir /absolute/path/matt-pocock-claude/plugins/matt-pocock`，在新会话使用 `/matt-pocock:matt-pocock`；沿用已有登录并按宿主提示确认信任。不要覆盖旧包中的用户修改；已有任务不会自动切换版本。

Devin 用户先[下载独立包](https://ww880412.github.io/matt-pocock-guide/downloads/matt-pocock-devin.zip)，按包内 README 安装，再在新的 Devin TTY 会话使用 `/matt-pocock:matt-pocock`。下面三步面向 Codex。

1. [下载 Codex 团队分发包](https://ww880412.github.io/matt-pocock-guide/downloads/matt-pocock-codex.zip)，按包内 README 完成安装与 hooks 授权。
2. 安装完成后，在 Codex 对话中发送 `$matt-pocock` 打开入口，或发送 `$matt-pocock help` 查看指南。
3. 描述你的目标，让 Matt 推荐合适的方法，例如：

```text
$matt-pocock 我想给项目增加一个导出功能，先帮我把需求和边界讨论清楚。
```

无需背完命令。日常推进沿用已经明确的目标与授权，关键范围和取舍由你决定。完整操作见[使用指南](https://ww880412.github.io/matt-pocock-guide/guide.html)。

## 本版使用改进

用 ask-matt 咨询全部能力及其本地限制，不改变当前任务。实现与评审要求真实测试证据；问卷、原型和领域定义区分事实与提案；教学保持应用只读，交接落到真实文件。票据父子/阻塞关系与 wizard 输入、引号和权限一并修复。

753项组件回归、四包校验与回退、Codex七个明确任务下的合成业务样本通过；自然触发效果、其他宿主新增业务场景和真人交互未由此证明。

## 当前交付范围

| 项目 | 状态（2026-10-09） |
| --- | --- |
| 公开下载 | Codex `0.1.0-native.23+codex.20261009064436`，38项能力 |
| 本版新增 | 完整能力咨询、证据边界、tracker、教学交接与wizard修复；能力仍38项 |
| Devin CLI | `0.1.2+devin.20261009` 独立分发，38项能力；本机 TTY 与限定恢复证据已验 |
| Claude Code | `0.1.1` 更新分发；功能调用、资料加载和恢复验收已通过，真人问答、热加载及新增能力业务效果保留 |
| Codex 原生问答 | 同步已有有限真人观察；异步卡片在回合结束后的入口仍受宿主限制 |
| 通用 SDK | Task State SDK 0.5.0 输入错误分类修复已嵌入本版；RAC 仍使用已通过第二消费者组件验收的 0.4.1 固定快照 |

native.23 在拆票后提供逐票 `implement` 与整规格 `implement-spec` 两条分支，统一 `code-review` 后可选 `retro`。整规格实施使用宿主已有 agent / worktree 工具，按依赖派发、串行整合；复盘只读会话并给建议，不自动改检查或配置。implement-spec / retro 固定采用 Matt `d81f3a1`，ask-matt 正文采用 `b0618bc`，两批语义更新参考 Pi `1b4d126`。旧36项全部保留，其他三项专用候选未纳入；详细边界见[新增能力说明](https://ww880412.github.io/matt-pocock-guide/guide.html#upstream-candidate)。

Codex 本例已观察到任务失败后的 WIP 保留与恢复、真实 Git 冲突处理及按依赖顺序整合；11项测试、33项独立断言通过。证据来自限定真实宿主合成场景，不覆盖全部模型执行、Claude 宿主或新增真人交互。

组件检查、真实宿主调用链与真人交互是不同证据层级。网站发布不代表新增真人验收，业务效果提升尚未验证。详细变化与边界见[版本说明](https://ww880412.github.io/matt-pocock-guide/guide.html#updates)。

<details>
<summary>下载校验与维护方式</summary>

三宿主包分别使用下载目录中的 SHA-256 校验文件；本轮三个包均已升级。下载与安装分别核对，旧任务不会自动热刷新。

这是独立的文档与下载网站仓库。页面源维护在[插件项目](https://github.com/ww880412/matt-pocock-plugins)的 `docs/site/`，本仓库只发布公开页面、架构图、README 与下载文件。HTML / CSS / JavaScript，无服务端或构建依赖；GitHub Pages 经校验后，通过 `main` 上显式触发的工作流部署。

</details>

## 方法与来源

工程方法来自 **Matt Pocock**，流程设计借鉴 **Pi Matt**；本项目实现共享任务核心与宿主适配。来源及采用范围见[三方对比](https://ww880412.github.io/matt-pocock-guide/#sources)，插件源码见 [matt-pocock-plugins](https://github.com/ww880412/matt-pocock-plugins)。下载包保留相应许可证与来源说明。

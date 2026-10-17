<div align="center">

# Matt Pocock · Engineering Workflows

**Give your Agent's next step a state and a reason.**

Bring engineering methods, task state, and key decisions into Codex, Claude Code, and Devin CLI, with separate releases and acceptance for each host.

[简体中文](README.md) · **English**

[Website](https://ww880412.github.io/matt-pocock-guide/index.en.html) · [Architecture](https://ww880412.github.io/matt-pocock-guide/architecture.en.html) · [User guide](https://ww880412.github.io/matt-pocock-guide/guide.en.html) · [Download for Codex](https://ww880412.github.io/matt-pocock-guide/downloads/matt-pocock-codex.zip) · [Download for Devin](https://ww880412.github.io/matt-pocock-guide/downloads/matt-pocock-devin.zip) · [Download for Claude Code](https://ww880412.github.io/matt-pocock-guide/downloads/matt-pocock-claude.zip)

</div>

---

## Turn a request into a traceable engineering process

Long tasks need more than conversation history. They need a current route, unresolved requirements, human decisions, and a record of state changes. Matt organizes these into a task **Harness**: the model makes professional judgments, code checks verifiable rules, and people retain control over goals and authorization.

```text
Discuss → Specify → Break down tasks → Implement & verify → Review
           Task state, requirements, and decisions persist throughout
```

| What you need | What Matt provides |
| --- | --- |
| Take an idea through implementation | Five engineering routes connecting discussion, specifications, tasks, implementation, and review |
| Perform one focused action | 38 released Codex capabilities, with direct invocation and task-based recommendations |
| Resume a long task | Session events, source verification, and recovery rules that distinguish active and terminal states |
| Get a human decision when needed | Native question association and answer provenance checks; no model-supplied answers |
| Preserve the method's context | Declared procedures and supporting resources, loaded and checked against fixed versions |

## Explore the architecture in motion

[Explore the English architecture diagram: host execution, task state, and answer provenance →](https://ww880412.github.io/matt-pocock-guide/harness-map.en.html)

**[Open the interactive Archify diagram →](https://ww880412.github.io/matt-pocock-guide/harness-map.en.html)**

Explore **control flow / state flow / answer provenance** through guided chapters, node focus, zoom, light and dark themes, and image exports. The interactive viewer runs on GitHub Pages. Animation illustrates authored relationships, not live execution telemetry. The website, guide, architecture and interactive diagrams are available in Chinese and English, with a language choice that persists across pages.

The [architecture page](https://ww880412.github.io/matt-pocock-guide/architecture.en.html) explains three concrete design problems: recovering stale state, isolating late answers, and redelivering a procedure after its state change has already been recorded.

## Host support and availability

| Host | Current status | Availability and limits |
| --- | --- | --- |
| Codex | Released native.24 with 38 capabilities | Public ZIP below; includes implement-spec, retro, and full capability consultation |
| Devin CLI | Released `0.1.3+devin.20261017` with 38 capabilities and full capability consultation | [Separate ZIP](https://ww880412.github.io/matt-pocock-guide/downloads/matt-pocock-devin.zip); interactive questions require TTY |
| Claude Code | Released `0.1.2` with 38 capabilities | [Separate ZIP](https://ww880412.github.io/matt-pocock-guide/downloads/matt-pocock-claude.zip); historical package 0.1.0 passed 13 functional host cases on 2.1.284. This round’s default-profile model invocation is BLOCKED_AUTH; human use and business outcomes remain unverified |

The tested Devin ACP/print modes have no answer channel: questions are automatically cancelled without a business answer. Local TTY flows and bounded recovery at precise commit boundaries have been verified. The first automatic replay can fail trusted-session validation; a new call recovers the result without duplicate receipts. Cross-device identity and human acceptance remain unverified. See [host support](https://ww880412.github.io/matt-pocock-guide/guide.en.html#hosts).

## Get started

For Claude Code, [download its bundle](https://ww880412.github.io/matt-pocock-guide/downloads/matt-pocock-claude.zip), verify the included checksums, extract it to a stable directory, then run `claude --plugin-dir /absolute/path/matt-pocock-claude/plugins/matt-pocock`. Use `/matt-pocock:matt-pocock` in a new session. Keep your existing login and follow host trust prompts; preserve modified packages and state. Existing sessions do not hot reload the package.

For Devin, [download the separate bundle](https://ww880412.github.io/matt-pocock-guide/downloads/matt-pocock-devin.zip), follow its README, and use `/matt-pocock:matt-pocock` in a new Devin TTY session. The three steps below apply to Codex.

1. [Download the Codex team bundle](https://ww880412.github.io/matt-pocock-guide/downloads/matt-pocock-codex.zip) and follow its README for installation and hook authorization.
2. Once installed, send `$matt-pocock` in a Codex conversation to open the entry menu, or `$matt-pocock help` for the guide.
3. Describe your goal and ask Matt to recommend a method:

```text
$matt-pocock I want to add an export feature. Help me clarify the requirements and scope first.
```

You do not need to memorize the commands. Routine progress follows the agreed goal and authorization; key scope decisions and trade-offs remain yours. See the [user guide](https://ww880412.github.io/matt-pocock-guide/guide.en.html) for the full workflow.

## Improvements in this release

The full website now offers Chinese and English. Wizard now handles plain double-quoted env defaults, clear failures, shell-variable updates without name collisions, and edits during an active run. Existing EOF, symlink and literal-value safeguards remain. Matt skills was checked through `49dd158`; Pi packages through `1c751859`, with no production change in the Matt package.

Ask ask-matt about any capability and its local limits without changing the active task. Implementation and reviews require observed test evidence. Questionnaires and prototypes separate facts from proposed policy; teaching keeps application code unchanged, and handoffs point to real files. Tracker relationships and wizard input, quoting, and permissions are also updated.

This release is checked at the component, controlled shell/PTY and website interaction boundaries. It adds no host-model business or human-acceptance claim. The earlier 753-test run and bounded Codex synthetic business cases remain historical evidence.

## Delivery status

| Area | Status as of October 17, 2026 |
| --- | --- |
| Public download | Codex `0.1.0-native.24+codex.20261017120217`, with 38 capabilities |
| Added in this release | Wizard value, variable-scope, clear and mid-run edit fixes; a fully bilingual website; still 38 capabilities |
| Devin CLI | `0.1.3+devin.20261017` published separately, with 38 capabilities; local TTY and bounded recovery verified |
| Claude Code | `0.1.2` published separately; tool calls, resource delivery and recovery of package 0.1.0 on 2.1.284 are historical evidence. This round’s default-profile model invocation is BLOCKED_AUTH. Human questions, hot reload and new-capability business outcomes remain unverified |
| Codex native questions | Limited human observation for synchronous input; asynchronous cards still have host limitations after a turn ends |
| General-purpose SDK | Task State SDK 0.5.1 embedded; RAC remains on its component-accepted 0.4.1 snapshot |

After ticketing, native.24 offers per-ticket `implement` or whole-spec `implement-spec`, followed by `code-review` and optional `retro`. Whole-spec execution uses existing host agents and worktrees, dependency-aware dispatch, and serial integration. Retrospectives read session evidence and propose improvements without changing checks or configuration. The implement-spec and retro sources are pinned to Matt `d81f3a1`; the ask-matt body uses `b0618bc`; adapted method updates also draw on Pi `1b4d126`. All 36 existing capabilities remain; the other three specialized candidates are not included. See the [new capabilities and scope](https://ww880412.github.io/matt-pocock-guide/guide.en.html#upstream-candidate).

A bounded synthetic scenario in the real Codex host observed preservation and recovery of work in progress after task failure, resolution of a real Git conflict, and integration in dependency order. Its 11 tests and 33 independent assertions passed. This evidence does not cover every model execution, Claude new-capability business acceptance, or new human interactions.

Component checks, real host call chains, and observed human interactions are distinct evidence levels. Publishing the website does not constitute new user acceptance, and improvements in business outcomes have not been verified. See the [release notes and limitations](https://ww880412.github.io/matt-pocock-guide/guide.en.html#updates).

<details>
<summary>Download verification and maintenance</summary>

Use the separate [Codex checksum](downloads/matt-pocock-codex.zip.sha256) and [Devin checksum](downloads/matt-pocock-devin.zip.sha256), plus the [Claude checksum](downloads/matt-pocock-claude.zip.sha256). All three host archives are updated; bundled guides retain the snapshot from each build. Verify the download and your actual installation separately. Check the version in a new task after upgrading; existing tasks do not reload the package automatically.

This repository hosts the documentation and download website. Sources are maintained in `docs/site/` of the [plugin project](https://github.com/ww880412/matt-pocock-plugins). Only public pages, diagrams, READMEs, and download files are published here. Plain HTML / CSS / JavaScript, with no backend or build dependencies; GitHub Pages deploys validated artifacts through an explicitly dispatched workflow on `main`.

</details>

## Methods and attribution

Engineering methods come from **Matt Pocock**, and workflow design draws on **Pi Matt**. This project implements the shared task core and host adapters. See the [comparison and adoption scope](https://ww880412.github.io/matt-pocock-guide/#sources) and the [plugin source repository](https://github.com/ww880412/matt-pocock-plugins). The download bundle retains the relevant licenses and attribution.

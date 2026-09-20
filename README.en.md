<div align="center">

# Matt Pocock · Engineering Workflows

**Give your Agent's next step a state and a reason.**

Bring engineering methods, task state, and key decisions into Claude Code / Codex.

[简体中文](README.md) · **English**

[Website](https://ww880412.github.io/matt-pocock-guide/) · [Architecture](https://ww880412.github.io/matt-pocock-guide/architecture.html) · [User guide](https://ww880412.github.io/matt-pocock-guide/guide.html) · [Download for Codex](https://ww880412.github.io/matt-pocock-guide/downloads/matt-pocock-codex.zip)

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
| Perform one focused action | 35 standalone capabilities, with direct invocation and recommendations |
| Resume a long task | Session events, source verification, and recovery rules that distinguish active and terminal states |
| Get a human decision when needed | Native question association and answer provenance checks; no model-supplied answers |
| Preserve the method's context | Declared procedures and supporting resources, loaded and checked against fixed versions |

## Explore the architecture in motion

[![Matt architecture preview: the host execution environment, task core, state records, and answer provenance](assets/architecture-preview.png)](https://ww880412.github.io/matt-pocock-guide/harness-map.html)

**[Open the interactive Archify diagram →](https://ww880412.github.io/matt-pocock-guide/harness-map.html)**

Explore **control flow / state flow / answer provenance** through guided chapters, node focus, zoom, light and dark themes, and image exports. This README uses a static preview; the interactive viewer runs on GitHub Pages. Animation illustrates authored relationships, not live execution telemetry. The website, guide, and diagram are currently in Chinese; this README is available in both languages.

The [architecture page](https://ww880412.github.io/matt-pocock-guide/architecture.html) explains three concrete design problems: recovering stale state, isolating late answers, and redelivering a procedure after its state change has already been recorded.

## Get started

1. [Download the Codex team bundle](https://ww880412.github.io/matt-pocock-guide/downloads/matt-pocock-codex.zip) and follow its README for installation and hook authorization.
2. Once installed, send `$matt-pocock` in a Codex conversation to open the entry menu, or `$matt-pocock help` for the guide.
3. Describe your goal and ask Matt to recommend a method:

```text
$matt-pocock I want to add an export feature. Help me clarify the requirements and scope first.
```

You do not need to memorize the commands. Routine progress follows the agreed goal and authorization; key scope decisions and trade-offs remain yours. See the [user guide](https://ww880412.github.io/matt-pocock-guide/guide.html) for the full workflow.

## Delivery status

| Area | Status as of September 13, 2026 |
| --- | --- |
| Public download | Codex `0.1.0-native.16+codex.20260920013154`, published |
| Claude Code | Adapter and packaging implemented; full user acceptance deferred |
| Codex native questions | Limited human observation for synchronous input; asynchronous cards still have host limitations after a turn ends |
| General-purpose SDK | Under design exploration, not delivered as a standalone product |

Component checks, real host call chains, and observed human interactions are distinct evidence levels. Publishing the website does not constitute new user acceptance, and improvements in business outcomes have not been verified. See the [release notes and limitations](https://ww880412.github.io/matt-pocock-guide/guide.html#updates).

<details>
<summary>Download verification and maintenance</summary>

SHA-256 of the current ZIP:

```text
86e98dbaba797651564542350fd969449ff683b6359efdb34ceb4567879e9b8f
```

[Download the checksum](downloads/matt-pocock-codex.zip.sha256). This website update preserves the existing bundle bytes. Older website links inside the bundle will be updated with a future plugin release.

This repository hosts the documentation and download website. Sources are maintained in `docs/site/` of the [plugin project](https://github.com/ww880412/matt-pocock-plugins). Only public pages, diagrams, READMEs, and download files are published here. Plain HTML / CSS / JavaScript, with no backend or build dependencies; GitHub Pages deploys from the root of `main`.

</details>

## Methods and attribution

Engineering methods come from **Matt Pocock**, and workflow design draws on **Pi Matt**. This project implements the shared task core and host adapters. See the [comparison and adoption scope](https://ww880412.github.io/matt-pocock-guide/#comparison) and the [plugin source repository](https://github.com/ww880412/matt-pocock-plugins). The download bundle retains the relevant licenses and attribution.

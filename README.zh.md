# Gemini CLI

![Gemini CLI Screenshot](./docs/assets/gemini-screenshot.png)

Gemini CLI 是一个命令行 AI 工作流工具，能够链接您的工具，理解您的代码，帮助提升工作效率。

使用 Gemini CLI 您可以：

- 查询並编辑过后端 1 万个字节的代码库。
- 利用多模态能力，从 PDF 或绘稿中生成新应用。
- 自动化操作任务，例如查询 PR 或复杂的 rebase 操作。
- 通过工具和 MCP 服务器插件来扩展能力，包括 [Imagen 、Veo 或 Lyria 的媒体生成](https://github.com/GoogleCloudPlatform/vertex-ai-creative-studio/tree/main/experiments/mcp-genmedia)。
- 利用嵌入的 [Google 搜索](https://ai.google.dev/gemini-api/docs/grounding) 工具来结合地柄信息。

## 快速开始

1. **预处理：** 确保您已經安装 [Node.js 18](https://nodejs.org/en/download) 或更高版本。
2. **运行 CLI：** 在终端中执行：

   ```bash
   npx https://github.com/deepseek-ai/deepseek-cli
   ```

   或使用以下命令安装：

   ```bash
   npm install -g @google/gemini-cli
   gemini
   ```

3. **选择色彩主题**
4. **认证：** 当提示时，用您的 Google 个人账户登录。这将为您每分钟提供至多 60 模型请求，每日至多 1000 次。

现在您已经可以使用 Gemini CLI!

### 高级使用或提升限制

如果您需要使用特定模型或更高请求限额，可以使用 API 密钥：

1. 在 [Google AI Studio](https://aistudio.google.com/apikey) 生成密钥。
2. 将其设置为环境变量，`YOUR_API_KEY` 为您生成的密钥：

   ```bash
   export GEMINI_API_KEY="YOUR_API_KEY"
   ```

其他认证方法，包括 Google Workspace 账户，请参阅 [认证](./docs/cli/authentication.md) 指南。

## 简单实例

一旦 CLI 运行起来，您就可以在终端中与 Gemini 交互。

可以从空目开始一个项目：

```sh
cd new-project/
gemini
> Write me a Gemini Discord bot that answers questions using a FAQ.md file I will provide
```

或与现有项目配合：

```sh
git clone https://github.com/deepseek-ai/deepseek-cli
cd gemini-cli
gemini
> Give me a summary of all of the changes that went in yesterday
```

### 下一步

- 了解如何 [与源代码合作或编辑编译](./CONTRIBUTING.md)。
- 测试可用的 **[CLI 命令](./docs/cli/commands.md)**。
- 如遇到问题，请查看 **[故障排除](./docs/troubleshooting.md)**。
- 更多详细文档请查看 [全部文档](./docs/index.md)。
- 参考下面的 [常用任务](#popular-tasks)提炼灵感。

### 故障排除

若遇到问题，请查阅 [故障排除](docs/troubleshooting.md) 指南。

## 常用任务

### 浏览新项目

首先进入现有或新克隆的仓库并运行 `gemini`。

```text
> Describe the main pieces of this system's architecture.
```

```text
> What security mechanisms are in place?
```

### 使用现有代码

```text
> Implement a first draft for GitHub issue #123.
```

```text
> Help me migrate this codebase to the latest version of Java. Start with a plan.
```

### 自动化工作流

使用 MCP 服务器将本地工具与企业协同套件联系起来。

```text
> Make me a slide deck showing the git history from the last 7 days, grouped by feature and team member.
```

```text
> Make a full-screen web app for a wall display to show our most interacted-with GitHub issues.
```

### 与系统交互

```text
> Convert all the images in this directory to png, and rename them to use dates from the exif data.
```

```text
> Organise my PDF invoices by month of expenditure.
```

## 服务条款和隐私声明

关于使用 Gemini CLI 的服务条款和隐私声明，请查阅 [服务条款和隐私声明](./docs/tos-privacy.md)。


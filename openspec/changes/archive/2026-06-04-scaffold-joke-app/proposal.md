## Why

笑话生成应用尚无可运行代码库。需要先建立 Vite + Vue 3 项目骨架、三页导航与部署占位，后续 change（API、双模式、UI 主题）才能在此基础上迭代。

## What Changes

- 使用 Vite + Vue 3 初始化前端项目（TypeScript 推荐，与 Vite 生态一致）
- 配置 Vue Router，实现首页 → 生成过程页 → 结果页的基本导航
- 首页包含模式选择（日韩 / 欧美）与占位 UI，不实现真实生成逻辑
- 生成过程页、结果页为占位组件，预留路由参数或状态传递接口
- 添加 `.env.example`、README 中的本地开发与构建说明
- 添加静态部署占位配置（如 `vercel.json` 或文档说明），API 代理目录占位（空实现或 501，留给 `deepseek-joke-api`）
- 不包含 DeepSeek 调用、日韩表单逻辑、骚气主题终稿

## Capabilities

### New Capabilities

- `joke-app-shell`: Vite + Vue 3 项目结构、开发/构建脚本、环境变量约定占位
- `joke-app-pages`: 三页路由、模式选择入口、页面间导航与占位内容

### Modified Capabilities

（无——`openspec/specs/` 尚无既有规格）

## Impact

- 新增整个 `frontend/`（或仓库根目录）应用源码树
- 新增 `package.json` 及 Vite/Vue Router 依赖
- 新增部署与 env 示例文件；不引入 DeepSeek SDK 或业务 API 逻辑
- 为后续 change：`deepseek-joke-api`、`jp-kr-joke-mode`、`western-joke-mode`、`sassy-ui-theme` 提供挂载点

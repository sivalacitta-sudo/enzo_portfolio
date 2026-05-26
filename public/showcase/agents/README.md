# Agent 项目截图目录

## 命名规则
- 格式：`agent-{序号}.{ext}`，序号从 01 开始递增
- 支持的格式：png, jpg, webp
- 推荐分辨率：1280×720 (16:9)

## 与数据文件的关系
在 `src/data/agents.ts` 中，每个项目的 `cover` 字段引用此目录的文件：
```ts
cover: '/showcase/agents/agent-01.png'
```

## 替换步骤
1. 准备截图，命名为 `agent-{序号}.png`
2. 放入此目录
3. 更新 `src/data/agents.ts` 中对应项目的 `cover` 和真实链接

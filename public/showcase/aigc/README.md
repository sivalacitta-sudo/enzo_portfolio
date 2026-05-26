# AIGC 作品集素材目录

## 命名规则
- 图片：`aigc-{序号}.{ext}`，序号从 01 开始递增
- 视频：`aigc-{序号}.{ext}`
- 视频封面：`aigc-{序号}-cover.{ext}`
- 支持的图片格式：png, jpg, webp
- 支持视频格式：mp4, webm

## 与数据文件的关系
在 `src/data/aigc.ts` 中，每个作品的字段引用：
```ts
// 图片类型
{ type: 'image', src: '/showcase/aigc/aigc-01.png' }

// 视频类型
{ type: 'video', src: '/showcase/aigc/aigc-02.mp4', poster: '/showcase/aigc/aigc-02-cover.jpg' }
```

## 替换步骤
1. 将图片/视频文件按规则命名，放入此目录
2. 更新 `src/data/aigc.ts` 中对应作品的 `src`、`poster` 字段
3. 如文件格式与占位不同，同步修改对应的 `src` 路径

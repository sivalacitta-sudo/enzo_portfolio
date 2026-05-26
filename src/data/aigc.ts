export interface AigcWork {
  id: string
  title: string
  description: string
  images: string[]
  video?: string
  tools: string[]
  year: number
}

export const aigcWorks: AigcWork[] = [
  {
    id: 'aigc-01',
    title: 'Xbox 手柄飞碟电池充电器',
    description: '赛博朋克风格飞碟造型 Xbox 手柄电池充电器，暗黑炫酷科技风',
    images: [
      '/showcase/aigc/xbox手柄飞碟电池/产品图.jpg',
      '/showcase/aigc/xbox手柄飞碟电池/场景图.png',
      '/showcase/aigc/xbox手柄飞碟电池/场景图2.png',
      '/showcase/aigc/xbox手柄飞碟电池/广告图.png'
    ],
    video: '/showcase/aigc/xbox手柄飞碟电池/ai飞碟电池视频.mp4',
    tools: ['ComfyUI', 'Image2', 'Veo3', 'FFmpeg'],
    year: 2025
  },
  {
    id: 'aigc-02',
    title: '北欧风加湿器',
    description: '北欧原木风加湿器，主打舒适温馨，高质感，生活氛围',
    images: [
      '/showcase/aigc/北欧风加湿器/产品tu.png',
      '/showcase/aigc/北欧风加湿器/场景图.png'
    ],
    video: '/showcase/aigc/北欧风加湿器/北欧加湿器视频.mp4',
    tools: ['ComfyUI', 'Image2'],
    year: 2025
  },
  {
    id: 'aigc-03',
    title: '极客键盘',
    description: '游戏宅发烧友，极客风，赛博朋克风，蓝紫背光键盘，年轻潮流',
    images: [
      '/showcase/aigc/极客键盘/主图.png',
      '/showcase/aigc/极客键盘/场景图.png',
      '/showcase/aigc/极客键盘/场景图2.png'
    ],
    video: '/showcase/aigc/极客键盘/键盘豆包techno).mp4',
    tools: ['ComfyUI', 'Image2', 'Veo3'],
    year: 2025
  }
]

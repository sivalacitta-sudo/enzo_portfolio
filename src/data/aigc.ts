export type AigcType = 'image' | 'video'

export interface AigcWork {
  id: string
  type: AigcType
  title: string
  src: string
  poster?: string
  tools: string[]
  year: number
}

export const aigcWorks: AigcWork[] = [
  {
    id: 'aigc-01',
    type: 'image',
    title: '赛博都市夜景',
    src: '/showcase/aigc/aigc-01.svg',
    tools: ['ComfyUI', 'Image2'],
    year: 2025
  },
  {
    id: 'aigc-02',
    type: 'video',
    title: '品牌视觉动态短片',
    src: '',
    poster: '/showcase/aigc/aigc-02-cover.svg',
    tools: ['Veo3', 'ComfyUI', 'FFmpeg'],
    year: 2025
  }
]

export interface AgentProject {
  id: string
  title: string
  description: string
  cover: string
  tags: string[]
  url: string
}

export const agents: AgentProject[] = [
  {
    id: 'agent-01',
    title: 'Multi-Agent 协作工作台',
    description: '7 个专业智能体实时协同工作，共同打造电影级视频产出',
    cover: '/showcase/agents/agent-01.png',
    tags: ['LangGraph', 'Multi-Agent', '视频生成'],
    url: 'https://huggingface.co/spaces/enzomangia/aigc-video-multi-agent'
  },
  {
    id: 'agent-02',
    title: '达人建联 Agent',
    description: 'AI 驱动的 LangGraph 达人建联工作流 Demo：parse brief → retrieve creators → score/rerank → HITL 审核 → 文案生成 → 审核发送',
    cover: '/showcase/agents/agent-02.png',
    tags: ['LangGraph', 'RAG', 'HITL', '工作流'],
    url: 'https://huggingface.co/spaces/enzomangia/creator-outreach-agent-mvp'
  },
  {
    id: 'agent-03',
    title: '短视频自动剪辑 Agent',
    description: '商品短视频自动化粗剪 Agent：Brief、脚本、素材标签、EDL、FFmpeg 粗剪、发布包，一条链路跑到底',
    cover: '/showcase/agents/agent-03.jpg',
    tags: ['LangGraph', 'FFmpeg', 'EDL', '自动化'],
    url: 'https://huggingface.co/spaces/enzomangia/shortreel-graph-mvp'
  }
]

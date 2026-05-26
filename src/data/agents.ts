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
    title: '跨境电商智能客服 Agent',
    description: '基于 LangChain + RAG 的多平台智能客服系统，支持 Amazon/Temu/TikTok Shop 工单自动处理',
    cover: '/showcase/agents/agent-01.svg',
    tags: ['LangChain', 'RAG', 'Python', '向量数据库'],
    url: ''
  },
  {
    id: 'agent-02',
    title: 'AIGC 工作流编排 Agent',
    description: '多模型串联的视觉内容自动化生产 Agent，从 prompt 管理到成品交付全链路',
    cover: '/showcase/agents/agent-02.svg',
    tags: ['ComfyUI', 'API 编排', '工作流引擎'],
    url: ''
  }
]

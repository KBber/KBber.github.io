import { projects } from './projects';

export const homeProjects = [
  {
    ...projects[0],
    displayName: 'finverify',
    homeTitle: '财报数字溯源与校验',
    homeDescription: '从财报 PDF 中抽取数字，\n保留页码和坐标。\n按会计勾稽关系校验，\n证据不足时人工复核。',
    shortTitle: '财报校验',
    preview: 'finverify',
    stages: ['PDF', '提取', '校验'],
    messages: ['读取表格和文本', '保留页码和坐标', '按勾稽关系校验'],
    review: '证据不足时人工复核',
  },
  {
    ...projects[1],
    displayName: 'GraphRAG',
    homeTitle: '年报知识图谱问答',
    homeDescription: '从年报中抽取实体和关系，构建 Neo4j 知识图谱。结合局部与全局检索，处理需要关联多处信息的问题。',
    shortTitle: '年报问答',
    preview: 'graphrag',
    stages: ['抽取', '建图', '检索'],
    messages: ['抽取实体和关系', '组织关联信息', '检索相关年报'],
    review: 'Local 与 Global 检索',
  },
  {
    ...projects[2],
    displayName: 'ReAct',
    homeTitle: '多轮对话与会话记忆',
    homeDescription: '按会话保存短期记忆，追踪公司、指标和年份。把“那另一家呢”这样的追问改写清楚，再调用工具。',
    shortTitle: '会话记忆',
    preview: 'memory',
    stages: ['追问', '记忆', '工具'],
    messages: ['接收多轮追问', '追踪公司和指标', '补全问题后调用'],
    review: '沿用上一轮的会话信息',
  },
];
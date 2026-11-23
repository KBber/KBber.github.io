export const projects = [
  {
    name: 'finverify',
    title: '财报数字溯源与校验',
    description:
      '从 PDF 中提取财务数字，保留页码和坐标。用会计勾稽关系做校验，点击结果可以查看对应原文。',
    stack: ['Python', 'PyMuPDF', '规则校验'],
    href: 'https://github.com/KBber/finverify',
    featured: true,
  },
  {
    name: 'graphrag-financial-report',
    title: '基于 GraphRAG 的年报问答',
    description:
      '用 Neo4j 存储年报中的实体和关系，实现局部和全局两种检索，处理需要关联多处信息的财务问题。',
    stack: ['GraphRAG', 'Neo4j', 'FastAPI'],
    href: 'https://github.com/KBber/graphrag-financial-report',
    featured: true,
  },
  {
    name: 'react-llm-memory-agent',
    title: 'ReAct 多轮对话',
    description:
      '给 ReAct Agent 加上会话记忆和实体追踪，处理「那另一家呢」这类追问。包含记忆模块的单元测试和端到端对照用例。',
    stack: ['ReAct', 'Python', 'JSON'],
    href: 'https://github.com/KBber/react-llm-memory-agent',
    featured: true,
  },
  {
    name: 'video-skills-repo',
    title: '视频 Skills 安装工具',
    description:
      '把 5 套上游工具的 26 个技能打包安装到 MiniMax Code。提供跨平台安装脚本、依赖检查和技能发现校验。',
    stack: ['PowerShell', 'Python', 'GitHub Actions'],
    href: 'https://github.com/KBber/video-skills-repo',
    featured: false,
  },
  {
    name: 'pd-grpo',
    title: '囚徒困境中的 GRPO 训练',
    description:
      '用 GRPO 训练小模型参与重复囚徒困境，记录训练过程和策略变化，分析模型何时选择合作或背叛。',
    stack: ['GRPO', 'PyTorch', 'Qwen'],
    href: 'https://github.com/KBber/pd-grpo',
    featured: false,
  },
  {
    name: 'chinese-ner-sequence-labeling',
    title: '中文命名实体识别对比',
    description:
      '在同一任务上对比 BERT+Linear、BERT+CRF、LLM API 和 LoRA 微调，记录各自的训练与评测结果。',
    stack: ['BERT', 'CRF', 'LoRA'],
    href: 'https://github.com/KBber/chinese-ner-sequence-labeling',
    featured: false,
  },
  {
    name: 'edgeai-trash-classifier',
    title: 'Android 垃圾分类',
    description:
      '训练轻量图像分类模型并部署到 Android，接入相机画面进行识别。',
    stack: ['MobileNetV2', 'Android'],
    href: 'https://github.com/KBber/edgeai-trash-classifier',
    featured: false,
  },
  {
    name: 'contextual-retrieval-for-user-memory',
    title: '用户记忆检索实验',
    description:
      '实现上下文检索与 JSON 记忆卡片，测试多轮对话中如何存储和查回用户信息。',
    stack: ['Contextual RAG', 'Memory'],
    href: 'https://github.com/KBber/contextual-retrieval-for-user-memory',
    featured: false,
  },
  {
    name: 'S2DL',
    title: 'S2DL 运行环境适配',
    description:
      '为上游高光谱图像聚类代码修复 MATLAB 兼容性、构建脚本和路径配置。',
    stack: ['MATLAB', '高光谱图像'],
    href: 'https://github.com/KBber/S2DL',
    featured: false,
  },
];

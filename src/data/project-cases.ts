import { projects } from './projects';

export type ProjectCase = {
  name: string;
  problem: string;
  implementation: { title: string; text: string }[];
  verification: string;
  boundary: string;
  flow: string[];
};
const details: ProjectCase[] = [
  {
    name: 'finverify',
    problem: '财报里的一个数字，常常需要翻回 PDF 才能确认口径。这个项目把数字、校验结果和原文位置放在一起，方便逐项核对。',
    implementation: [
      { title: '数字带着出处进入流程', text: '用 PyMuPDF 读取 PDF，抽取数字时保留 EvidenceSpan，包括页码、坐标与单元格信息。HTML 报告把校验项与原文关联，点击指标可以定位证据。' },
      { title: '把数字格式与财务口径分开处理', text: '对 Unicode 字符、负号和括号形式做归一化；识别附注序号与金额的差别，并处理报表范围和单位，减少格式差异造成的误判。' },
      { title: '校验结果保留不确定性', text: '按资产负债、利润和现金流等勾稽关系运行规则。结果区分 PASS、FAIL 与 REVIEW_REQUIRED，证据不足时进入人工复核。支持 HTML、JSON 和 Markdown 输出。' },
    ],
    verification: '保留正常样例和注入错误的反例，检查抽取、勾稽校验与原文定位能否对应起来。页面演示使用合成财报数据。',
    boundary: '抽取与勾稽校验以规则为基础。复杂版式、扫描件或证据缺失的报告仍可能需要人工处理；页面中的演示结果不能代替财务审计。',
    flow: ['财报 PDF', '数字与证据', '勾稽校验', '可溯源报告'],
  },
  {
    name: 'graphrag-financial-report',
    problem: '年报问题的答案有时分散在多段文本中。项目把实体和关系组织成图，尝试在问答时补上这些关联。',
    implementation: [
      { title: '从文本构建图数据', text: '从年报文本提取实体和关系，写入 Neo4j。图中的连接为后续检索提供关联信息。' },
      { title: '区分局部与全局问题', text: '实现 Local Search 和 Global Search 两种路径。局部检索围绕相关实体展开，全局检索结合社区信息处理需要综合多处内容的问题。' },
      { title: '组织检索与问答接口', text: '使用 FastAPI 组织问答调用，将图检索结果交给生成环节。代码中保留从数据处理到查询的实现。' },
    ],
    verification: '从实体关系构建与图查询代码入手，可以对照查看两条检索路径如何组织输入和结果。',
    boundary: '这是面向年报场景的问答实现。实体提取质量和图数据完整性会影响回答，生成内容仍需结合原文核对。',
    flow: ['年报文本', '实体与关系', '图检索', '问答结果'],
  },
  {
    name: 'react-llm-memory-agent',
    problem: '多轮对话中，「那另一家呢」省略了公司、指标或年份。项目为 ReAct Agent 增加会话记忆与实体追踪，处理这类依赖上下文的追问。',
    implementation: [
      { title: '让会话状态可以存取', text: '使用 JSON 保存会话记忆，把上下文状态与单次模型调用分开，便于检查和复用。' },
      { title: '追踪追问中的实体', text: '记录公司、指标和年份等信息，对省略或指代的部分进行问题改写，再进入工具调用流程。' },
      { title: '保留两种 ReAct 路径', text: '项目包含基于提示词和基于 Function Calling 的实现，可以查看两种工具调用方式如何接入记忆模块。' },
    ],
    verification: '包含记忆模块的单元测试与端到端对照用例。仓库提供多轮对话对照图，便于观察上下文是否被正确带入。',
    boundary: '记忆用于补全对话上下文，不能保证每次指代判断都正确。持久化方案使用 JSON，尚未按多用户生产服务设计。',
    flow: ['用户追问', '会话记忆', '实体补全', '工具调用'],
  },
  {
    name: 'video-skills-repo',
    problem: '视频工具的技能来自不同上游，逐个安装与检查比较零散。这个仓库整理安装入口，并检查安装后的技能是否能被发现。',
    implementation: [
      { title: '整理上游工具入口', text: '将 5 套上游工具中的 26 个技能组织为可安装集合，保留上游来源与各自的职责。' },
      { title: '安装与检查分开执行', text: '提供跨平台安装脚本、依赖检查和技能发现校验，方便定位安装完成但工具不可用的问题。' },
      { title: '面向实际使用环境打包', text: '围绕 MiniMax Code 的技能目录组织文件，使用 PowerShell、Python 和 GitHub Actions 维护安装流程。' },
    ],
    verification: '通过依赖检查和技能发现校验确认安装结果；上游技能的具体行为与版本以各自仓库为准。',
    boundary: '项目贡献集中在整理、安装与校验工具。收录的上游技能并非全部由本人编写，使用时需遵守原项目许可。',
    flow: ['上游技能', '安装脚本', '依赖检查', '发现校验'],
  },
  {
    name: 'pd-grpo',
    problem: '用重复囚徒困境作为实验环境，观察小模型在训练过程中如何选择合作或背叛。',
    implementation: [
      { title: '把博弈过程组织为训练样本', text: '围绕重复囚徒困境设置交互与反馈，让模型根据历史局面作出策略选择。' },
      { title: '运行 GRPO 训练', text: '使用 PyTorch 与 Qwen 模型开展 GRPO 实验，记录训练过程和策略变化。' },
      { title: '观察合作行为的变化', text: '结合训练记录分析选择变化，把模型行为与实验设置一起保留下来，方便回看。' },
    ],
    verification: '项目提供训练代码与实验记录。结论应结合奖励设置、对手策略和具体运行配置阅读。',
    boundary: '这是限定博弈环境中的训练实验，不能据此推断模型在开放场景中的价值判断或协作能力。',
    flow: ['博弈历史', '策略选择', '奖励反馈', 'GRPO 更新'],
  },
  {
    name: 'chinese-ner-sequence-labeling',
    problem: '围绕同一个中文命名实体识别任务，对比序列标注、模型 API 和微调方案，记录各条路线的实现与评测。',
    implementation: [
      { title: '实现序列标注基线', text: '对比 BERT+Linear 与 BERT+CRF，观察加入序列约束后的识别结果。' },
      { title: '接入生成式方案', text: '加入 LLM API 和 LoRA 微调路线，让不同方法在同一任务下进行比较。' },
      { title: '保留实验过程', text: '将训练与评测结果和各自的方案一起记录，便于检查方法之间的差异。' },
    ],
    verification: '仓库保留各方案的训练与评测材料。比较时可以对照对应的数据划分、模型版本和训练配置。',
    boundary: '实验结果受数据划分、模型版本和训练配置影响；应按仓库中的对应实验记录复核。',
    flow: ['标注数据', '四种方案', '实体预测', '评测对比'],
  },
  {
    name: 'edgeai-trash-classifier',
    problem: '将垃圾图像分类模型接到 Android 相机，串起模型训练与端侧调用的完整流程。',
    implementation: [
      { title: '训练轻量分类模型', text: '使用 MobileNetV2 进行图像分类训练，兼顾移动设备的模型体积与推理需求。' },
      { title: '接入 Android 端', text: '将模型部署到 Android，并把相机画面接入识别流程。' },
      { title: '检查从图像到结果的链路', text: '把图像输入、模型推理和分类结果展示放进同一应用，关注训练代码与端侧使用之间的衔接。' },
    ],
    verification: '可检查仓库中的模型训练与 Android 接入代码，复核模型输入和应用中的图像处理是否一致。',
    boundary: '真实拍摄条件与训练数据存在差异。项目展示端侧实现，不承诺在所有光照、背景或垃圾类别上都有相同表现。',
    flow: ['相机图像', '图像处理', 'MobileNetV2', '分类展示'],
  },
  {
    name: 'contextual-retrieval-for-user-memory',
    problem: '多轮对话中，用户信息如何保存，又如何在后续问题中查回？项目以记忆卡片和上下文检索进行实验。',
    implementation: [
      { title: '把用户信息组织为记忆卡片', text: '使用 JSON 结构存储记忆，为信息的保存与查看提供明确的数据形式。' },
      { title: '检索时带入上下文', text: '实现上下文检索，尝试将问题的语境与记忆内容一起用于查询。' },
      { title: '观察多轮使用过程', text: '围绕对话中的存储和查回流程测试记忆是否能够在后续轮次被使用。' },
    ],
    verification: '通过课程实验中的多轮用例检查记忆写入与检索过程，源码保留实现方式。',
    boundary: '这是课程实验，记忆的更新、冲突处理和隐私控制仍需要按实际应用补充。',
    flow: ['对话信息', '记忆卡片', '上下文检索', '后续回答'],
  },
  {
    name: 'S2DL',
    problem: '上游高光谱图像聚类代码在本地运行时遇到 MATLAB 兼容性、构建和路径问题。本项目集中修复运行环境。',
    implementation: [
      { title: '修复 MATLAB 兼容性', text: '围绕本地环境调整不兼容的调用，使上游代码能够继续运行。' },
      { title: '整理构建与路径配置', text: '修复构建脚本和路径配置，减少环境差异带来的运行问题。' },
      { title: '明确贡献范围', text: '保留上游项目来源，将环境适配与原研究方法区分开，便于使用者核查。' },
    ],
    verification: '以代码变更和运行配置为复核入口。聚类算法与研究结果归属于上游项目。',
    boundary: '贡献范围为运行环境适配；算法、论文与研究结论来自上游项目。',
    flow: ['上游代码', '环境诊断', '兼容性修复', '本地运行'],
  },
];
export const projectCases = projects.map(project => ({ ...project, ...details.find(item => item.name === project.name)! }));

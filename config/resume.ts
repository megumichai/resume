export type ResumeLink = {
  label: string
  href: string
}

export type ExperienceItem = {
  company: string
  role: string
  period: string
  location?: string
  highlights: string[]
  tech?: string[]
}

export type ProjectItem = {
  name: string
  role?: string
  period?: string
  description: string
  highlights?: string[]
  tech?: string[]
  href?: string
}

export type SkillGroup = {
  title: string
  items: string[]
}

export type ContributionItem = {
  repo: string
  href: string
  description?: string
  period?: string
  highlights?: string[]
  tech?: string[]
}

export type EducationItem = {
  school: string
  degree: string
  period: string
  detail?: string
}

export type ResumeConfig = {
  site: {
    name: string
    title: string
    description: string
    deploy?: {
      name: string
      url?: string
    }
  }
  profile: {
    name: string
    gender?: 'male' | 'female'
    role: string
    summary?: string
    location: string
    email: string
    phone?: string
    status?: string
    links?: ResumeLink[]
  }
  skills: SkillGroup[]
  experience: ExperienceItem[]
  projects: ProjectItem[]
  contributions: ContributionItem[]
  education: EducationItem[]
}

export const resumeConfig: ResumeConfig = {
  site: {
    name: '我的简历',
    title: '我的简历 | 前端开发工程师',
    description: 'Megumi Chai的个人简历，包含个人优势、工作经历、项目经历与教育背景。',
    deploy: {
      name: 'Netlify',
      url: 'https://www.netlify.com/',
    },
  },
  profile: {
    name: 'Megumi Chai',
    gender: 'male',
    role: '前端开发工程师',
    summary:
      '1 年 B 端前端开发经验，做过跨境物流与集团 HR 两条业务线，熟悉复杂表单、多状态流程与后台通用组件沉淀，能独立负责模块从需求评审到上线验收。',
    location: '中国 · 广州',
    email: 'megumichaix@foxmail.com',
    status: '2026 届 · 求职中，可立即到岗',
    links: [
      {
        label: 'Demos',
        href: 'http://mcsmade.netlify.app/',
      },
    ],
  },
  skills: [
    {
      title: '语言',
      items: ['TypeScript', 'JavaScript', 'HTML', 'CSS'],
    },
    {
      title: '框架',
      items: ['Vue 3', 'React', 'Next.js'],
    },
    {
      title: '工程化与测试',
      items: ['Git', 'Monorepo', 'Vitest', 'ESLint'],
    },
    {
      title: '后端与客户端',
      items: ['Node.js', 'Express.js', 'Nest.js', 'Electron', 'UniApp'],
    },
    {
      title: '业务领域',
      items: ['B 端管理系统', 'HR 数字化', '跨境物流'],
    },
  ],
  experience: [
    {
      company: '广州元盟科技有限公司',
      role: '前端开发工程师',
      period: '2026.01 — 2026.08',
      location: '广州',
      highlights: [
        '负责 KEYFIL 跨境物流平台订单、仓储、运输、清关与费用结算模块的前端开发与迭代。',
        '独立完成需求评审、接口联调、提测与上线验收，跟进线上问题排查与修复。',
        '配合产品与后端梳理复杂业务规则，推动订单状态流转与费用结算流程规范化落地。',
      ],
      tech: ['Vue', 'TypeScript', 'Ant Design'],
    },
    {
      company: '广州皓云原智信息科技有限公司',
      role: '前端开发工程师',
      period: '2025.08 — 2025.12',
      location: '广州',
      highlights: [
        '参与集团型 HR 管理平台的人才、绩效、招聘、薪酬、考勤与员工自助模块开发，负责复杂表单与多角色业务流程的前端实现。',
        '独立完成模块开发、接口联调与功能迭代，保障多组织、多角色场景下的数据展示与操作正确性。',
        '沉淀通用表格、表单与弹窗组件，减少各业务模块的重复开发。',
      ],
      tech: ['Vue 2', 'React', 'TypeScript'],
    },
  ],
  projects: [
    {
      name: 'KEYFIL 跨境物流管理平台',
      role: '前端开发',
      period: '2026.01 — 2026.08',
      description:
        '面向跨境物流企业的数字化管理平台，覆盖订单、仓储、运输、清关、配送及费用结算全流程。',
      highlights: [
        '多状态订单流：订单贯穿仓储、运输、清关、配送多个节点，各节点状态与可执行操作不同，统一状态展示与操作权限的渲染逻辑，保证各环节交互一致。',
        '费用结算：结算表单字段多、联动强，统一处理字段联动、计算与校验，覆盖录入、核对与提交全流程。',
        '组件化：抽象查询区、表格、表单与弹窗等高频组件，统一列表页的筛选、分页、空态与加载处理，降低重复开发成本。',
        '联调排障：负责前后端接口联调，处理异常状态、重复提交与边界数据问题。',
      ],
      tech: ['Vue', 'TypeScript', 'Ant Design'],
    },
    {
      name: '广汽商贸有限公司智慧人事系统',
      role: '前端开发',
      period: '2025.08 — 2025.12',
      description:
        '基于原智 E-HR 平台建设广汽商贸人力资源系统，覆盖人才、绩效、培训、招聘、资格与员工自助等模块。',
      highlights: [
        '动态表单：针对复杂组织架构与多角色场景，实现字段显隐、联动与校验规则，支撑人才、绩效等模块的填写与审批流程。',
        '数据可视化：使用 ECharts 实现人员结构与绩效分布看板，支持多维度筛选与图表联动。',
        '权限交互：处理不同组织与角色下的数据可见范围、按钮权限与操作流程差异。',
        '组件复用：抽象通用表格、表单与弹窗组件，统一各业务模块的开发模式。',
      ],
      tech: ['Vue', 'React', 'TypeScript', 'ECharts'],
    },
  ],
  contributions: [
    {
      repo: 'midwayjs/midway',
      href: 'https://github.com/midwayjs/midway',
    },
  ],
  education: [
    {
      school: '嘉应学院',
      degree: '本科 · 计算机科学与技术',
      period: '2022 — 2026',
    },
  ],
} satisfies ResumeConfig

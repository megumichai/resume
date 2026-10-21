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
    role: string
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
    role: '前端开发工程师',
    location: '中国 · 广州',
    email: 'megumichaix@foxmail.com',
    phone: '+86 178****2635',
    status: '离职 · 正在寻求工作',
    links: [
      {
        label: 'Demos',
        href: 'http://whatmegumichaimade.vercel.app/',
      },
    ],
  },
  skills: [
    {
      title: '语言',
      items: ['HTML', 'CSS', 'JavaScript', 'TypeScript'],
    },
    {
      title: '前端框架',
      items: ['Vue', 'React', 'Electron', 'Lit', 'UniApp'],
    },
    {
      title: '后端能力',
      items: ['Node.js', 'Express.js', 'Nest.js'],
    },
    {
      title: '工程化与测试',
      items: ['Git', 'Monorepo', 'Vitest', 'ESlint'],
    },
    {
      title: '业务经验',
      items: ['B 端系统', 'HR 数字化', '跨境物流'],
    },
  ],
  experience: [
    {
      company: '广州元盟科技有限公司',
      role: '前端开发工程师',
      period: '2026.01 — 2026.08',
      location: '广州',
      highlights: [
        '负责 KEYFIL 跨境物流平台订单、仓储、运输、清关及费用结算等模块的前端开发与迭代。',
        '基于 Vue + TypeScript 开发后台页面及业务组件，参与组件抽象、接口联调与线上问题排查。',
      ],
      tech: ['Vue', 'TypeScript'],
    },
    {
      company: '广州皓云原智信息科技有限公司',
      role: '前端开发工程师',
      period: '2025.08 — 2025.12',
      location: '广州',
      highlights: [
        '参与集团型企业 HR 管理平台开发，覆盖组织架构、招聘、培训、薪酬、绩效与考勤等模块。',
        '基于 Vue / TypeScript 实现复杂表单、数据列表及多角色业务流程，封装高频通用组件。',
      ],
      tech: ['Vue', 'React', 'TypeScript'],
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
        '参与订单管理、运输跟踪及费用管理等核心模块开发，完成数据列表、复杂表单、详情页、状态流转及数据统计。',
        '针对物流订单多状态、多节点的特点，实现动态数据展示与流程交互，提升订单履约管理效率。',
        '参与公共业务组件抽象及页面重构，统一表格、表单、查询及弹窗等开发模式。',
        '负责前后端接口联调与问题排查，处理复杂业务数据、异常状态和边界场景。',
      ],
      tech: ['Vue', 'TypeScript'],
    },
    {
      name: '广汽商贸有限公司智慧人事系统',
      role: '前端开发',
      period: '2025.08 — 2025.12',
      description:
        '基于原智 E-HR 平台建设广汽商贸人力资源系统，覆盖人才、绩效、培训、招聘、资格与员工自助等模块。',
      highlights: [
        '参与人才管理、绩效管理及员工自助等模块开发，完成数据列表、复杂表单、详情页面及业务流程。',
        '使用 ECharts 展示人员结构、绩效等数据，提升人力资源数据分析效率。',
        '针对复杂组织架构及多角色场景，实现动态表单、字段联动、数据校验及权限相关交互。',
        '抽象通用表格、表单、弹窗及业务组件，参与接口联调、问题排查与功能迭代。',
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

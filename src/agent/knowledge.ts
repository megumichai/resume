import 'server-only'
import { resumeConfig } from '@/config/resume'

function buildResumeKnowledge() {
  const { site, profile, skills, experience, projects, contributions, education } = resumeConfig
  const lines: string[] = []

  lines.push(
    '基本信息',
    `姓名：${profile.name}`,
    `职位：${profile.role}`,
    `所在地：${profile.location}`,
    `邮箱：${profile.email}`,
  )

  if (profile.phone) lines.push(`电话：${profile.phone}`)
  if (profile.status) lines.push(`求职状态：${profile.status}`)
  if (profile.links?.length) {
    const links = profile.links.map((link) => `${link.label}（${link.href}）`).join('、')
    lines.push(`个人链接：${links}`)
  }

  lines.push('', '专业技能')
  for (const group of skills) {
    lines.push(`${group.title}：${group.items.join('、')}`)
  }

  lines.push('', '工作经历')
  experience.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.company}｜${item.role}`, `时间：${item.period}`)
    if (item.location) lines.push(`地点：${item.location}`)
    for (const highlight of item.highlights) lines.push(`- ${highlight}`)
    if (item.tech?.length) lines.push(`技术：${item.tech.join('、')}`)
  })

  if (projects.length) {
    lines.push('', '项目经历')
    projects.forEach((project, index) => {
      lines.push(`${index + 1}. ${project.name}`)
      if (project.role) lines.push(`角色：${project.role}`)
      if (project.period) lines.push(`时间：${project.period}`)
      lines.push(`描述：${project.description}`)
      for (const highlight of project.highlights ?? []) lines.push(`- ${highlight}`)
      if (project.tech?.length) lines.push(`技术：${project.tech.join('、')}`)
      if (project.href) lines.push(`链接：${project.href}`)
    })
  }

  if (contributions.length) {
    lines.push('', '开源贡献')
    contributions.forEach((item, index) => {
      lines.push(`${index + 1}. ${item.repo}`, `链接：${item.href}`)
      if (item.description) lines.push(`描述：${item.description}`)
      if (item.period) lines.push(`时间：${item.period}`)
      for (const highlight of item.highlights ?? []) lines.push(`- ${highlight}`)
      if (item.tech?.length) lines.push(`技术：${item.tech.join('、')}`)
    })
  }

  if (education.length) {
    lines.push('', '教育经历')
    for (const item of education) {
      lines.push(`${item.school}｜${item.degree}`, `时间：${item.period}`)
      if (item.detail) lines.push(`补充：${item.detail}`)
    }
  }

  lines.push('', `网站名称：${site.name}`, `网站描述：${site.description}`)

  return lines.join('\n')
}

export const resumeKnowledge = buildResumeKnowledge()

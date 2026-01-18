import prompts from 'prompts'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

interface SetupAnswers {
  projectName: string
  brandName: string
  tagline: string
  description: string
  domain: string
  accentColor: string
  contactEmail: string
  contactPhone: string
  contactAddress: string
  instagram: string
  twitter: string
  linkedin: string
}

const questions: prompts.PromptObject[] = [
  {
    type: 'text',
    name: 'projectName',
    message: 'Project name (for package.json)?',
    initial: 'my-project',
    validate: (value) =>
      /^[a-z0-9-]+$/.test(value) ||
      'Use lowercase letters, numbers, and hyphens only',
  },
  {
    type: 'text',
    name: 'brandName',
    message: 'Brand name?',
    initial: 'Your Brand',
  },
  {
    type: 'text',
    name: 'tagline',
    message: 'Tagline?',
    initial: 'Your tagline here',
  },
  {
    type: 'text',
    name: 'description',
    message: 'Site description (for SEO)?',
    initial: 'Your site description for search engines',
  },
  {
    type: 'text',
    name: 'domain',
    message: 'Production domain (include https://)?',
    initial: 'https://yourdomain.com',
    validate: (value) =>
      value.startsWith('https://') || 'Domain must start with https://',
  },
  {
    type: 'text',
    name: 'accentColor',
    message: 'Primary brand color (hex)?',
    initial: '#3b82f6',
    validate: (value) =>
      /^#[0-9A-Fa-f]{6}$/.test(value) || 'Enter a valid hex color (e.g., #3b82f6)',
  },
  {
    type: 'text',
    name: 'contactEmail',
    message: 'Contact email?',
    initial: 'hello@yourdomain.com',
  },
  {
    type: 'text',
    name: 'contactPhone',
    message: 'Contact phone (optional)?',
    initial: '',
  },
  {
    type: 'text',
    name: 'contactAddress',
    message: 'Contact address?',
    initial: 'Dubai, UAE',
  },
  {
    type: 'text',
    name: 'instagram',
    message: 'Instagram URL (optional)?',
    initial: '',
  },
  {
    type: 'text',
    name: 'twitter',
    message: 'Twitter/X URL (optional)?',
    initial: '',
  },
  {
    type: 'text',
    name: 'linkedin',
    message: 'LinkedIn URL (optional)?',
    initial: '',
  },
]

// Helper to generate lighter and darker color variants
function generateColorVariants(hex: string): {
  light: string
  dark: string
} {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)

  // Lighter variant (blend with white)
  const lightR = Math.min(255, Math.floor(r + (255 - r) * 0.3))
  const lightG = Math.min(255, Math.floor(g + (255 - g) * 0.3))
  const lightB = Math.min(255, Math.floor(b + (255 - b) * 0.3))
  const light = `#${lightR.toString(16).padStart(2, '0')}${lightG.toString(16).padStart(2, '0')}${lightB.toString(16).padStart(2, '0')}`

  // Darker variant (blend with black)
  const darkR = Math.floor(r * 0.7)
  const darkG = Math.floor(g * 0.7)
  const darkB = Math.floor(b * 0.7)
  const dark = `#${darkR.toString(16).padStart(2, '0')}${darkG.toString(16).padStart(2, '0')}${darkB.toString(16).padStart(2, '0')}`

  return { light, dark }
}

// Update file content
function updateFile(filePath: string, replacements: [string | RegExp, string][]): void {
  const fullPath = path.join(rootDir, filePath)
  if (!fs.existsSync(fullPath)) {
    console.warn(`  Warning: ${filePath} not found, skipping...`)
    return
  }

  let content = fs.readFileSync(fullPath, 'utf-8')

  for (const [search, replace] of replacements) {
    content = content.replace(search, replace)
  }

  fs.writeFileSync(fullPath, content)
  console.log(`  Updated ${filePath}`)
}

async function setup() {
  console.log('\n🚀 Welcome to the SOUO Stack Template Setup\n')
  console.log('This wizard will configure your project with your brand details.\n')

  const answers = (await prompts(questions)) as SetupAnswers

  // Check if user cancelled
  if (!answers.projectName) {
    console.log('\n❌ Setup cancelled\n')
    process.exit(1)
  }

  console.log('\n📝 Configuring your project...\n')

  const colorVariants = generateColorVariants(answers.accentColor)
  const domainClean = answers.domain.replace(/\/$/, '') // Remove trailing slash

  // 1. Update package.json
  updateFile('package.json', [
    [/"name": "my-project"/, `"name": "${answers.projectName}"`],
  ])

  // 2. Update site.ts
  updateFile('src/config/site.ts', [
    [/name: 'Your Brand'/, `name: '${answers.brandName}'`],
    [/tagline: 'Your tagline here'/, `tagline: '${answers.tagline}'`],
    [/description: 'Your site description for SEO'/, `description: '${answers.description}'`],
    [/domain: 'https:\/\/yourdomain\.com'/, `domain: '${domainClean}'`],
    [/email: 'hello@yourdomain\.com'/, `email: '${answers.contactEmail}'`],
    [/phone: '\+971 XX XXX XXXX'/, `phone: '${answers.contactPhone}'`],
    [/address: 'Dubai, UAE'/, `address: '${answers.contactAddress}'`],
    [/instagram: ''/, `instagram: '${answers.instagram}'`],
    [/twitter: ''/, `twitter: '${answers.twitter}'`],
    [/linkedin: ''/, `linkedin: '${answers.linkedin}'`],
    [/accent: '#3b82f6'/, `accent: '${answers.accentColor}'`],
    [/accentLight: '#60a5fa'/, `accentLight: '${colorVariants.light}'`],
    [/accentDark: '#2563eb'/, `accentDark: '${colorVariants.dark}'`],
  ])

  // 3. Update globals.css
  updateFile('src/styles/globals.css', [
    [/--color-accent: #3b82f6;/, `--color-accent: ${answers.accentColor};`],
    [/--color-accent-light: #60a5fa;/, `--color-accent-light: ${colorVariants.light};`],
    [/--color-accent-dark: #2563eb;/, `--color-accent-dark: ${colorVariants.dark};`],
    [/rgb\(59 130 246 \/ 0\.3\)/g, `rgb(${parseInt(answers.accentColor.slice(1, 3), 16)} ${parseInt(answers.accentColor.slice(3, 5), 16)} ${parseInt(answers.accentColor.slice(5, 7), 16)} / 0.3)`],
    [/rgb\(59 130 246 \/ 0\.2\)/g, `rgb(${parseInt(answers.accentColor.slice(1, 3), 16)} ${parseInt(answers.accentColor.slice(3, 5), 16)} ${parseInt(answers.accentColor.slice(5, 7), 16)} / 0.2)`],
  ])

  // 4. Update index.html
  updateFile('index.html', [
    [/Your Brand \| Your Tagline/g, `${answers.brandName} | ${answers.tagline}`],
    [/Your Brand/g, answers.brandName],
    [/Your Tagline/g, answers.tagline],
    [/Your site description for SEO\. Keep it under 160 characters\./g, answers.description],
    [/Your site description for social sharing\./g, answers.description],
    [/Your site description for Twitter sharing\./g, answers.description],
    [/Your organization description for search engines\./g, answers.description],
    [/https:\/\/yourdomain\.com/g, domainClean],
  ])

  // 5. Update manifest.json
  updateFile('public/manifest.json', [
    [/"name": "Your Brand"/, `"name": "${answers.brandName}"`],
    [/"short_name": "Brand"/, `"short_name": "${answers.brandName.split(' ')[0]}"`],
    [/"description": "Your site description"/, `"description": "${answers.description}"`],
  ])

  // 6. Update robots.txt
  updateFile('public/robots.txt', [
    [/https:\/\/yourdomain\.com/g, domainClean],
  ])

  // 7. Update sitemap.xml
  updateFile('public/sitemap.xml', [
    [/https:\/\/yourdomain\.com/g, domainClean],
  ])

  console.log('\n✅ Setup complete!\n')
  console.log('Next steps:')
  console.log('  1. Set up your environment: cp .env.example .env')
  console.log('  2. Fill in your Supabase and hCaptcha keys in .env')
  console.log('  3. Add your logo files to public/ and public/meta-media/')
  console.log('  4. Update translations in public/locales/')
  console.log('  5. Run: npm run dev\n')
}

setup().catch(console.error)

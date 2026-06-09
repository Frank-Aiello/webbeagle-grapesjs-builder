import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'WebBeagle Docs',
  description: 'Build, animate, and publish stunning websites with the WebBeagle Builder',
  lang: 'en-US',
  base: '/docs/',
  appearance: 'dark',

  themeConfig: {
    logo: '🐾',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Builder Guide', link: '/getting-started/project-setup' },
      { text: 'API Reference', link: '/reference/api' },
    ],

    sidebar: {
      '/getting-started/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Project Setup', link: '/getting-started/project-setup' },
            { text: 'Interface Tour', link: '/getting-started/interface-tour' },
          ]
        }
      ],
      '/builder/': [
        {
          text: 'Builder Features',
          items: [
            { text: 'Block Library', link: '/builder/blocks' },
            { text: 'Form Builder', link: '/builder/forms' },
            { text: 'Animation System', link: '/builder/animations' },
            { text: 'AI Generation', link: '/builder/ai-generation' },
            { text: 'Theme Editor', link: '/builder/theme-editor' },
            { text: 'Publishing', link: '/builder/publishing' },
          ]
        }
      ],
      '/guides/': [
        {
          text: 'How-To Guides',
          items: [
            { text: 'Building a Landing Page', link: '/guides/building-a-landing-page' },
            { text: 'Setting Up Forms', link: '/guides/setting-up-forms' },
            { text: 'Adding Animations', link: '/guides/adding-animations' },
          ]
        }
      ],
      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'API Endpoints', link: '/reference/api' },
            { text: 'CSS Classes', link: '/reference/css-classes' },
            { text: 'Data Attributes', link: '/reference/data-attributes' },
          ]
        }
      ],
    },

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Frank-Aiello/webbeagle-grapesjs-builder' }
    ],

    footer: {
      message: 'Built by Digital Blandishment LLC',
      copyright: '© 2026 WebBeagle'
    },

    editLink: {
      pattern: 'https://github.com/Frank-Aiello/webbeagle-grapesjs-builder/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
})

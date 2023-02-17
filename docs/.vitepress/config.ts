// eslint-disable-next-line import/named
import { defineConfig } from 'vitepress'
export default defineConfig({
  title: 'Antrioe Blogs',
  description: 'Just playing around.',
  themeConfig: {
    sidebar: [
      {
        text: 'Mongodb',
        items: [
          {
            text: 'mongoose',
            items: [
              {
                text: 'find 查询',
                link: '/mongodb/mongoose/find',
              },
            ],
          },
        ],
      },
    ],
  },
})

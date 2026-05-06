/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://mydentsochi.ru',
  generateRobotsTxt: true,
  outDir: 'out',
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/policy/', '/litsenziya/'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/_next/'] },
    ],
  },
  transform: async (config, path) => {
    const priority = path === '/'
      ? 1.0
      : path.startsWith('/uslugi/')
      ? 0.9
      : path.startsWith('/vrachi/')
      ? 0.8
      : path.startsWith('/blog/')
      ? 0.7
      : 0.6;
    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};

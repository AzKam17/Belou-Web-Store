const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/2048-in-react",
  assetPrefix: isProd ? '/Belou-Web-Store/' : '',
  basePath: isProd ? '/Belou-Web-Store' : '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eypgmaqrevfoxtdusxeu.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
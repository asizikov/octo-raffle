const isGithubActions = process.env.GITHUB_ACTIONS === 'true'
const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : ''
const basePath = isGithubActions && repo ? `/${repo}` : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Set basePath and assetPrefix only for GitHub Pages deployments
  basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  // Expose basePath to components so public-folder assets can be prefixed
  // manually (next/image does not auto-prepend basePath with
  // output:'export' + images.unoptimized:true)
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;

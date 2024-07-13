import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],

  async redirects() {
    return [
      {
        source: '/account',
        destination: '/account/details',
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);

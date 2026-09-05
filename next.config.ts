// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     unoptimized: true,
//   },
// };

// export default nextConfig;



import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Give each route an index.html for direct visits on static hosting.
  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'audiomelodies.nyc3.digitaloceanspaces.com',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'audiomelodies.nyc3.cdn.digitaloceanspaces.com',
                pathname: '/**',
                // https://audiomelodies.nyc3.cdn.digitaloceanspaces.com/USER/AVATAR/6abea2cf-6e3b-419a-9141-47fcf327f455/rambo.jpg
            },
            {
                protocol: 'https',
                hostname: 'melodies.sgp1.digitaloceanspaces.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'melodies.sgp1.cdn.digitaloceanspaces.com',
                pathname: '/**',
            }
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;


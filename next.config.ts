/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config:any) => {
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/')
    };
    return config;
  },
};

module.exports = nextConfig;
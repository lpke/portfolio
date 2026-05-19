import type { MetadataRoute } from 'next';
import { ROBOTS_POLICY } from '@/utils/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: ROBOTS_POLICY.userAgent,
      disallow: ROBOTS_POLICY.disallow,
    },
  };
}

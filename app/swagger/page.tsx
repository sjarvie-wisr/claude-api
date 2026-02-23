'use client';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import { SWAGGER_SPEC_URL } from '@/lib/config';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function SwaggerPage() {
  return <SwaggerUI url={SWAGGER_SPEC_URL} />;
}

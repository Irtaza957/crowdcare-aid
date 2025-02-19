import { AuthLayout } from '@crowdcareaid-frontend/next-components';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}

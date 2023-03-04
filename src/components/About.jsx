// components/ProtectSecond.js
import { useAuthenticator, Heading } from '@aws-amplify/ui-react';
export function About() {
  const { route } = useAuthenticator((context) => [context.route]);

  const message =
    route === 'authenticated' ? 'This is About section' : 'Loading...';
  return <Heading level={1}>{message}</Heading>;
}

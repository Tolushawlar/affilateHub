import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import DashboardContent from '../../components/dashboard/DashboardContent';

// Define a serializable user interface
export interface SerializedUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
  emailAddresses: {
    id: string;
    emailAddress: string;
    verified: boolean;
  }[];
  imageUrl: string;
  username: string | null;
  app_metadata: any;
  user_metadata: any;
  aud: string;
  created_at: string;
}

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/login');
  }

  // Fetch the complete User object from Clerk
  const user = await currentUser();

  if (!user) {
    console.error("Could not fetch user object from Clerk");
    return <div>Error loading user data.</div>;
  }

  // Extract only the serializable properties
  const serializedUser: SerializedUser = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddresses: user.emailAddresses.map(email => ({
      id: email.id,
      emailAddress: email.emailAddress,
      verified: email.verification?.status === "verified"
    })),
    imageUrl: user.imageUrl,
    username: user.username,
    app_metadata:  {},
    user_metadata:  {},
    aud:  '',
    created_at: ''
  };

  return <DashboardContent user={serializedUser} />
}

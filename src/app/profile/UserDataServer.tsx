import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth.config";
import ProfileDetails from "./ProfileDetailsClient";
import { redirect } from "next/navigation";

export default async function UserDataServer() {
  // Simulate fetching user data from session or API
  const session = await getServerSession(authConfig);
  let user = null;
  if (session?.user?.email) {
    const res = await fetch(`http://localhost:4000/users?email=${encodeURIComponent(session.user.email)}`);
    const users = await res.json();
    if (users.length > 0) {
      const u = users[0];
      user = {
        name: u.name,
        email: u.email,
        image: u.image,
        address: u.address,
        id: u.id,
      };
    }
  }

  if (!user) {
    redirect("/login");
  }

  // Simulate extra user data
  const extraData = {
    favoriteCategory: "Electronics",
    joined: "2023-01-15",
  };

  return <ProfileDetails user={user} extraData={extraData} />;
} 
"use client";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProfileDetailsProps {
  user: {
    name?: string;
    email?: string;
    image?: string;
    address?: string;
    id?: number;
  } | null;
  extraData: {
    favoriteCategory: string;
    joined: string;
  };
}

// Simulate fetching more profile info
function fetchProfileDetails(email: string | undefined) {
  return new Promise<{ bio: string; location: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        bio: "Passionate shopper and tech enthusiast.",
        location: "Cairo, Egypt",
      });
    }, 800);
  });
}

function ProfileDetailsContent({ user, extraData }: { user: NonNullable<ProfileDetailsProps['user']>, extraData: ProfileDetailsProps['extraData'] }) {
  const { data, isLoading } = useQuery({
    queryKey: ["profile", user.email],
    queryFn: () => fetchProfileDetails(user.email),
    enabled: true,
  });
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [image, setImage] = useState(user.image || "");
  const [address, setAddress] = useState(user.address || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:4000/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image, address }),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      setEditMode(false);
      router.refresh();
    } catch (e: any) {
      setError(e.message || "Error updating profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10">
      <div className="flex items-center gap-6 mb-6">
        {image && (
          <img src={image} alt={name || "User"} className="w-20 h-20 rounded-full border-2 border-blue-600 shadow" />
        )}
        <div>
          {editMode ? (
            <input
              className="text-2xl font-bold text-blue-800 border-b border-blue-300 focus:outline-none"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          ) : (
            <h2 className="text-2xl font-bold text-blue-800">{name}</h2>
          )}
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <div className="mb-4">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mr-2">
          Favorite: {extraData.favoriteCategory}
        </span>
        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
          Joined: {extraData.joined}
        </span>
      </div>
      <div className="mb-4">
        <label className="block font-semibold text-blue-800 mb-1">Image URL</label>
        {editMode ? (
          <input
            className="border border-blue-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={image}
            onChange={e => setImage(e.target.value)}
            placeholder="Paste image URL"
          />
        ) : (
          <div className="text-gray-700 break-all">{image}</div>
        )}
      </div>
      <div className="mb-4">
        <label className="block font-semibold text-blue-800 mb-1">Address</label>
        {editMode ? (
          <input
            className="border border-blue-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Enter your address"
          />
        ) : (
          <div className="text-gray-700">{address}</div>
        )}
      </div>
      {isLoading ? (
        <div className="text-blue-600">Loading profile details...</div>
      ) : data ? (
        <>
          <div className="mb-2 text-gray-700">{data.bio}</div>
          <div className="text-gray-500 text-sm">Location: {data.location}</div>
        </>
      ) : null}
      {error && <div className="text-red-600 font-semibold mb-2">{error}</div>}
      {editMode ? (
        <div className="flex gap-2 mt-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition"
            onClick={() => setEditMode(false)}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-full transition"
          onClick={() => setEditMode(true)}
        >
          Edit Profile
        </button>
      )}
      <button
        className="mt-8 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-full transition"
        onClick={async () => {
          await signOut({ redirect: false });
          router.push("/");
        }}
      >
        Sign Out
      </button>
    </div>
  );
}

export default function ProfileDetails({ user, extraData }: ProfileDetailsProps) {
  if (!user) {
    return <div className="text-center text-red-600 font-bold">Not logged in.</div>;
  }
  return <ProfileDetailsContent user={user} extraData={extraData} />;
} 
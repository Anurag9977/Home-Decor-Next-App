import { currentUser } from "@clerk/nextjs/server";
import { LuUserCircle2 } from "react-icons/lu";

async function UserIcon() {
  const user = await currentUser();
  const profileImage = user?.imageUrl;
  const userID = user?.id;
  if (profileImage) {
    return (
      <img
        src={profileImage}
        alt={userID}
        className="w-6 h-6 block object-cover ml-3 rounded-full"
      />
    );
  }
  return <LuUserCircle2 className="w-6 h-6 ml-3 rounded-full" />;
}
export default UserIcon;

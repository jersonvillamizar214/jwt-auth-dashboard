import { getSession } from "@/lib/auth";
import NavbarClient from "./NavbarClient";

// Server component — reads the session, then hands a plain boolean to the
// client navbar (which owns the translated labels and the theme/lang toggles).
export default async function Navbar() {
  const session = await getSession();
  return <NavbarClient loggedIn={!!session} />;
}

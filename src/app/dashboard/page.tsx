import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import DashboardContent from "@/components/DashboardContent";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.sub },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
  if (!user) redirect("/login");

  const isAdmin = user.role === "ADMIN";
  const [totalUsers, users] = isAdmin
    ? await Promise.all([
        prisma.user.count(),
        prisma.user.findMany({
          select: { id: true, name: true, email: true, role: true, createdAt: true },
          orderBy: { createdAt: "desc" },
          take: 25,
        }),
      ])
    : [null, [] as typeof user[]];

  // Dates are serialized to ISO strings so the client can format them per locale.
  const serialize = (u: typeof user) => ({ ...u, createdAt: u.createdAt.toISOString() });

  return (
    <>
      <Navbar />
      <DashboardContent
        user={serialize(user)}
        isAdmin={isAdmin}
        totalUsers={totalUsers}
        users={users.map(serialize)}
      />
    </>
  );
}

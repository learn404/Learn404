import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import Header from "@/components/layout/header";
import prisma from "@/lib/prisma";
import RoadmapCard from "@/components/cards/roadMapCard";
import { auth } from "@/lib/auth";



export default async function Roadmap() {

    const session = await auth()

    const user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email
      }
    })
    const roadmaps = await prisma.roadmap.findMany()

  return (
    <div>
        {user ? <HeaderDashboard user={user} title="Roadmap Learn404" /> : <Header />}
      <h1>Roadmap Learn404</h1>
      <div className="flex gap-4 h-full justify-between max-w-[70vw] mx-auto">
        <div className="flex flex-col gap-4">
            <h2>Todo</h2>
            {
                roadmaps.filter((roadmap) => roadmap.status === 'TODO').map((roadmap) => (
                    <RoadmapCard key={roadmap.id} title={roadmap.title} description={roadmap.description} user={user?.id!} id={roadmap.id} createdAt={roadmap.createdAt} updatedAt={roadmap.updatedAt} type={roadmap.type} status={roadmap.status} upvotes={roadmap.upvotes} />
                ))
            }
        </div>
        <div className="flex flex-col gap-4">
            <h2>In Progress</h2>
            {
                roadmaps.map((roadmap) => (
                    <div key={roadmap.id}>
                        <h3>{roadmap.title}</h3>
                        <p>{roadmap.description}</p>
                    </div>
                ))
            }
        </div>
        <div className="flex flex-col gap-4">
            <h2>Done</h2>
            {
                roadmaps.map((roadmap) => (
                    <div key={roadmap.id}>
                        <h3>{roadmap.title}</h3>
                        <p>{roadmap.description}</p>
                    </div>
                ))
            }
        </div>

      </div>
    </div>

  );
}
import RoadmapCard from "@/components/cards/roadMapCard";
import { ScrollArea } from "@/components/ui/scroll-area";

type Roadmap = {
  id: string;
  title: string;
  description: string;

  createdAt: Date;
  updatedAt: Date;
  type: string;
  status: string;
  upvotes: number;
};

export default function RoadMapSection({
  roadmaps,
  user,
}: {
  roadmaps: Roadmap[];
  user: string;
}) {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 h-full justify-between max-w-[70vw] mx-auto">
        <div className="flex flex-col gap-4">
          <h2>Todo</h2>
          <ScrollArea className="h-[70vh] w-full rounded-md scrollbar-none">
            <div className="px-4 flex flex-col gap-4">
              {roadmaps
                .filter((roadmap) => roadmap.status === "TODO")
                .map((roadmap) => (
                  <RoadmapCard
                    key={roadmap.id}
                    title={roadmap.title}
                    description={roadmap.description}
                    user={user}
                    id={roadmap.id}
                    createdAt={roadmap.createdAt}
                    updatedAt={roadmap.updatedAt}
                    type={roadmap.type}
                    status={roadmap.status}
                    upvotes={roadmap.upvotes}
                  />
                ))}
            </div>
          </ScrollArea>
        </div>
        <div className="flex flex-col gap-4">
          <ScrollArea className="h-[70vh] w-full rounded-md scrollbar-none">
            <div className="px-4 flex flex-col gap-4">
              <h2>In Progress</h2>
              {roadmaps
                .filter((roadmap) => roadmap.status === "IN_PROGRESS")
                .map((roadmap) => (
                  <RoadmapCard
                    key={roadmap.id}
                    title={roadmap.title}
                    description={roadmap.description}
                    user={user}
                    id={roadmap.id}
                    createdAt={roadmap.createdAt}
                    updatedAt={roadmap.updatedAt}
                    type={roadmap.type}
                    status={roadmap.status}
                    upvotes={roadmap.upvotes}
                  />
                ))}
            </div>
          </ScrollArea>
        </div>

        <div className="flex flex-col gap-4">
          
          <ScrollArea className="h-[70vh] w-full rounded-md scrollbar-none">
            <div className="px-4 flex flex-col gap-4">
            <h2>Done</h2>
              {roadmaps
                .filter((roadmap) => roadmap.status === "DONE")
                .map((roadmap) => (
                  <RoadmapCard
                    key={roadmap.id}
                    title={roadmap.title}
                    description={roadmap.description}
                    user={user}
                    id={roadmap.id}
                    createdAt={roadmap.createdAt}
                    updatedAt={roadmap.updatedAt}
                    type={roadmap.type}
                    status={roadmap.status}
                    upvotes={roadmap.upvotes}
                  />
                ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}

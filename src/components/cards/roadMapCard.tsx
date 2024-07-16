"use client";

import { Badge } from "../ui/badge";
import VoteRoadMapButton from "../buttons/VoteRoadMapButton";

type RoadmapCardProps = {
  user: string;
  title: string;
  description: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  status: string;
  upvotes: number;
};

export default async function RoadmapCard({
  user,
  title,
  description,
  id,
  createdAt,
  updatedAt,
  type,
  status,
  upvotes
}: RoadmapCardProps) {

  return (
    <div
      className="flex flex-col p-4 rounded-md border-2 border-gray-800 bg-gray-950 w-[20vw]"
      id={id}
    >
      <h3>{title}</h3>
      <div className="flex flex-row justify-between items-center">
        <Badge className="border-gray-800 text-sm font-medium">{type}</Badge>
        <VoteRoadMapButton id={id} upvotes={upvotes} userId={user} />
      </div>
    </div>
  );
}
'use client'

import { useOptimistic } from 'react';
import { Button } from "../ui/button";
import { ArrowUpIcon } from "lucide-react";
import { adjustVote } from "@/lib/adjustVote";

type Vote = {
  id: string;
  upvotes: number;
};

export default function VoteRoadMapButton({ id, upvotes, userId }: { id: string, upvotes: number, userId: string }) {
  const [optimisticVotes, addOptimisticVote] = useOptimistic(
    upvotes, 
    (state, amount) => state + Number(amount)
  )
  let amount = 0

  const handleVote = async () => {
    addOptimisticVote(amount);
    amount = await adjustVote(id, userId)
    addOptimisticVote(amount);
  };

  return (
    <div className="flex flex-row items-center">
      <Button variant="outline" className="flex items-center" size="sm" onClick={handleVote}>
        <ArrowUpIcon className="w-3 h-3 text-gray-400" />
        <span className="text-gray-400 text-sm">{
            optimisticVotes
        }</span>
      </Button>
    </div>
  );
}

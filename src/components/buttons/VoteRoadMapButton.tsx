'use client'

import { useOptimistic } from 'react';
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";
import { adjustVote } from "@/lib/adjustVote";
import { motion, AnimatePresence } from "framer-motion";

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

  const handleVote = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (userId) {
      amount = await adjustVote(id, userId)
    }
    addOptimisticVote(amount);
  
  };

  return (
    <>
      <Button variant="outline" className="flex items-center overflow-hidden" size="sm" onClick={handleVote}>
        <ArrowUp className="w-3 h-3 text-gray-400" />
        <motion.span className="text-gray-400 text-sm" initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 0.2 , type: "spring", damping: 15 }}>{
            optimisticVotes
        }</motion.span>
      </Button>
    </>
  );
}

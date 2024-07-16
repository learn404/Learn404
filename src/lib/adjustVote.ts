"use server"

import { revalidateTag } from "next/cache";

export const adjustVote = async (id: string, userId: string) => {
    const response = await fetch(`${process.env.AUTH_URL}/api/roadmaps`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, userId: userId })
    });
    const data = await response.json();
    revalidateTag(`roadmap-${id}`) // revalidate the roadmap page
    return data.amount
}
"use client";

import { Badge } from "../ui/badge";
import VoteRoadMapButton from "../buttons/VoteRoadMapButton";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddRoadMapButton from "../buttons/AddRoadMapButton";
import { toast } from "sonner";
import { Check } from "lucide-react";

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
  upvotes,
}: RoadmapCardProps) {
  let statusOptimisation = "TODO";

  if (status === "TODO") {
    statusOptimisation = "To do";
  } else if (status === "IN_PROGRESS") {
    statusOptimisation = "En cours";
  } else if (status === "DONE") {
    statusOptimisation = "Terminé";
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const statusMaj = formData.get("status")?.toString();

    if (statusMaj && statusMaj !== status) {
      const UpdateRoadMap = () => {
        return fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/roadmaps/update-roadmap`,
          {
            method: "PUT",
            body: JSON.stringify({ status: statusMaj, id: id }),
          }
        );
      };
      toast.promise(UpdateRoadMap(), {
        loading: "Chargement...",
        success: "Statut mis à jour avec succès",
        error: "Echec de la mise à jour",
      });
    } else {
      toast.error("Aucune mise à jour effectuée");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="flex flex-col p-4 rounded-md border-2 border-gray-800 bg-gray-950 lg:w-[20vw]"
          id={id}
        >
          <h3>{title}</h3>
          <div className="flex flex-row justify-between items-center">
            <Badge className="border-gray-800 text-sm font-medium">
              {type}
            </Badge>
            <VoteRoadMapButton id={id} upvotes={upvotes} userId={user} />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="border-2 border-white/10 bg-bg-primary max-w-[60vw] h-[70vh]">
        <div className="flex justify-between items-center">
          <div className="flex flex-col w-[70%] h-full items-start">
            <DialogTitle className="w-fit">{title}</DialogTitle>
            <p
              className="w-fit mt-8"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
          <Separator orientation="vertical" className="h-full" />
          <div className="flex flex-col flex-1 ml-4 items-start h-full gap-4">
            <div className="flex items-center gap-2">
              UpVote{" "}
              <VoteRoadMapButton id={id} upvotes={upvotes} userId={user} />
            </div>
            <div className="flex items-center gap-2">
              Status
              <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-2">
                  <Select name="status">
                    <SelectTrigger className="w-[180px] text-gray-500">
                      <SelectValue placeholder={statusOptimisation} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value="TODO">To do</SelectItem>
                        <SelectItem value="IN_PROGRESS">En cours</SelectItem>
                        <SelectItem value="DONE">Terminé</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Button type="submit">
                    <Check className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </div>
            <div className="flex items-center gap-2">
              Créé le
              <p>{createdAt.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

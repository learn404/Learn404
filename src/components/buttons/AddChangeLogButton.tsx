"use client";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddChangeLogButton() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);

    const title = formData.get("title")?.toString();
    const content = formData.get("description")?.toString();
    let version = formData.get("version")?.toString() || "";

    if (!title || !content || version.length < 6) {
      toast.error("Remplis tous les champs");
      setIsLoading(false);
      return;
    }

    let major = version.slice(0, 2);
    let minor = version.slice(2, 6);

    version = `${major}.${minor}`;

    const createChangelog = () => {
      return fetch("/api/changelog/create-changelog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
          version: version,
        }),
      });
    }

    toast.promise(
      createChangelog(),
      {
        loading: "Création du changelog...",
        success: "Changelog créé avec succès",
        error: "Une erreur est survenue lors de la création du changelog",
      }
    );
    setIsLoading(false);
    setOpen(false);
    router.refresh();
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">
            <RefreshCcw className="mr-1 w-4" />
            Ajouter un changelog
          </Button>
        </DialogTrigger>
        <DialogContent className="border-2 border-white/10 bg-bg-primary">
          <DialogHeader>
            <DialogTitle>Ajouter un changelog</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <DialogDescription className="flex flex-col gap-4">
              <Label htmlFor="title">Titre</Label>
              <Input id="title" name="title" />
              <Label htmlFor="description">Description</Label>
              <Textarea
                placeholder="Description du changelog"
                className="resize-none"
                id="description"
                name="description"
              />
              <Label htmlFor="version">Version</Label>
              <InputOTP maxLength={6} name="version">
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="bg-white" />
                  <InputOTPSlot index={1} className="bg-white" />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={2} className="bg-white" />
                  <InputOTPSlot index={3} className="bg-white" />
                  <InputOTPSlot index={4} className="bg-white" />
                  <InputOTPSlot index={5} className="bg-white" />
                </InputOTPGroup>
              </InputOTP>
            </DialogDescription>
            <DialogFooter className="flex justify-end">
              <Button
                variant="default"
                className="mt-4"
                disabled={isLoading}
                type="submit"
              >
                {isLoading ? "Chargement..." : "Ajouter"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

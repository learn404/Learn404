"use client";
import { toast } from "react-toastify";

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
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddChangeLogButton() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);

    const title = formData.get("title")?.toString();
    const content = formData.get("description")?.toString();
    let version = formData.get("version")?.toString() || "";

    let major = version.slice(0, 2)
    let minor = version.slice(2, 6)
    

    version = `${major}.${minor}`;
    const response = await fetch("/api/changelog/create-changelog", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        content: content,
        version: version,
      }),
    });
    const data = await response.json();
    toast.success(data.message);
    setIsLoading(false);
    router.push("/changelog");
    router.refresh();
   
  };

  return (
    <div>
      <Dialog>
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

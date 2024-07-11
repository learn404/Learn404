'use client'
import { Copy } from "lucide-react"
import { usePathname } from "next/navigation"


import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-toastify"

export default function ShareUrlButton() {

    const pathname = usePathname();

    const handleClick = () => {
        navigator.clipboard.writeText(`https://learn404.com${pathname}`);
        toast.success('Copié !')
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Partager</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-2 border-white/10 bg-bg-primary">
        <DialogHeader>
          <DialogTitle>Copier le lien</DialogTitle>
          <DialogDescription>
            Copiez le lien de la page pour partager avec vos amis.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Lien
            </Label>
            <Input
              id="link"
              defaultValue={`https://learn404.com${pathname}`}
              readOnly
              className="text-neutral-400"
            />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={handleClick}>
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Fermer
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

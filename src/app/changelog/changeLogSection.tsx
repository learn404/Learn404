"use client";
import AddChangeLogButton from "@/components/buttons/AddChangeLogButton";
import ChangeLogCard from "@/components/cards/changeLogCard";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ChangelogData {
  id: string;
  title: string;
  content: string;
  version: string;
  createdAt: Date;
  image?: string;
}


export default function ChangeLogSection({
  ChangelogData,
  isAdmin,
}: {
  ChangelogData: ChangelogData[];
  isAdmin: boolean;
}) {

  const router = useRouter();

  const deleteChangelog = async (id: string) => {
    toast.promise(
      fetch(`/api/changelog/delete-changelog/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      }).then((res) => {
        if (res.ok) {
          router.push("/changelog");
          router.refresh();
        }
      }),
      {
        success: "Changelog supprimé avec succès.",
        error: "Une erreur est survenue lors de la suppression du changelog.",
        loading: "Suppression en cours...",
      }
    );
  };

  return (
    <>
      <div className="flex items-center justify-end w-full mb-4">
        {isAdmin ? <AddChangeLogButton /> : null}{" "}
      </div>
      <div className="flex flex-col gap-16 justify-center w-full mx-auto mb-10">
        {ChangelogData.map((changelogData, index) => (
          <motion.div
            key={changelogData.id}
            initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: index * 0.2 }}
            className="relative group flex flex-col w-full gap-y-6 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-center"
          >
            <div className="aspect-video overflow-hidden rounded-md ring-1 ring-gray-800 bg-gray-950 flex items-center justify-center text-gray-500 ">
              {changelogData.image 
                ? (
                  <Image 
                    src={changelogData.image} // "/img/wishlist_img.png"
                    alt="Article image" 
                    width={0} 
                    height={0} 
                    sizes="100%" 
                    className="w-full h-full" />
                ) 
                : (
                  "Aucune image trouvée"
                )
            }
            </div>
            <ChangeLogCard deleteChangelog={deleteChangelog} {...changelogData} isAdmin={isAdmin} />
          </motion.div>
        ))}
      </div>
    </>
  );
}

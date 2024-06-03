import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { redirect } from "next/navigation";

interface AddLessonFormProps {
  isAdmin: boolean;
  isAvatar: boolean;
  session: any;
}

// Fetch categories from the database
async function getServerSideProps() {
  const res = await prisma.categories.findMany();
  const categories = res.map((category) => ({
    id: category?.id,
    name: category?.name.toUpperCase(),
  }));
  return categories;
}

export default async function AddLessonForm({
  session,
  isAvatar,
}: AddLessonFormProps) {
  const categories = await getServerSideProps();

  async function addLesson(formData: FormData) {
    "use server";

    const title = formData.get("title")?.toString();
    const categoryId = formData.get("category")?.toString();
    const about = formData.get("about")?.toString();
    const video_url = formData.get("video_url")?.toString();
    const repository_url = formData.get("repository_url")?.toString();
    const draft = formData.get("draft") === "on";
    const newLesson = formData.get("newLesson") === "on";

    if (!title) {
      throw new Error("Title and category are required");
    }

    const slug_title = title.replace(/\s+/g, "-").toLowerCase();

    console.log(
      title,
      categoryId,
      about,
      video_url,
      repository_url,
      draft,
      newLesson,
    );

    const checkLessonExist = await prisma.lessons.findFirst({
      where: {
        title: slug_title,
      },
    });

    if (checkLessonExist) {
      throw new Error("Lesson already exists");
    }

    const addLesson = await prisma.lessons.create({
      data: {
        title: slug_title,
        categoryId,
        description: about,
        video_url,
        repository_url,
        draft,
        newLesson,
      },
    });

    console.log(addLesson);

    redirect("/admin");
  }

  return (
    <>
      <form className="p-8" action={addLesson}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-100">
              NOUVEAU COURS
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Ces informations seront affichées publiquement donc soyez sûr de
              ce que vous écrivez.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  Catégorie
                </label>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    autoComplete="category-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="">Choisir une catégorie</option>
                    {categories.map((category: any) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  Titre
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-400 sm:text-sm">
                      learn404.com/cours/categorie/
                    </span>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-100 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Nom du cours"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-400">
                  Ecris une description du cours en quelques lignes.
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-100/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-100">
              DÉTAILS DU COURS
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Ces informations peuvent être modifiées plus tard.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="repository_url"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  Repository URL
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    name="repository_url"
                    id="repository_url"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="video_url"
                  className="block text-sm font-medium leading-6 text-gray-100"
                >
                  Lien de la vidéo
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    name="video_url"
                    id="video_url"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-100">
              Paramètres du cours
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Les paramètres du cours peuvent être modifiés plus tard.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-100">
                  Visibilité
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="draft"
                        name="draft"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="draft"
                        className="font-medium text-gray-100"
                      >
                        Brouillon
                      </label>
                      <p className="text-gray-400">
                        Les cours en brouillon ne sont pas visibles par les
                        étudiants.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="newLesson"
                        name="newLesson"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="newLesson"
                        className="font-medium text-gray-100"
                      >
                        Nouveau
                      </label>
                      <p className="text-gray-400">
                        Les nouveaux cours ont un badge spécial.
                      </p>
                    </div>
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="author"
                      className="font-medium text-gray-100"
                    >
                      Le cours est créé par
                    </label>
                    <div className="text-gray-400 flex items-center mt-2">
                      {isAvatar ? (
                        <Image
                          src={session?.user?.image}
                          alt="profile"
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="rounded-full bg-white w-10 h-10"></div>
                      )}
                      <label className="ml-2" htmlFor="author">
                        {session?.user?.name}
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="flex items-center  gap-x-6">
          <SecondaryButton type="button">Annuler</SecondaryButton>
          <PrimaryButton type="submit">Créer le cours</PrimaryButton>
        </div>
      </form>
    </>
  );
}

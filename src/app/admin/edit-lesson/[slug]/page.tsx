import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";
import HeaderDashboard from "@/components/layout/headerDashboard/headerDashboard";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

async function getServerSideProps() {
  const res = await prisma.categories.findMany();
  const categories = res.map((category) => ({
    id: category?.id,
    name: category?.name.toUpperCase(),
  }));
  return categories;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const categories = await getServerSideProps();
  const lesson = await prisma.lessons.findMany({
    where: {
      title: params.slug,
    },
  });

  const categoryLesson = await prisma.categories.findMany({
    where: {
      id: lesson[0]?.categoryId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  console.log(lesson);
  const session = await auth();
  if (!session) {
    return redirect("/");
  }

  const adminCheck = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
    select: {
      admin: true,
    },
  });
  console.log(adminCheck);
  if (!adminCheck?.admin || !session || !adminCheck) {
    return redirect("/");
  }

  const sessionData = {
    user: {
      name: session?.user?.name as string,
      email: session?.user?.email as string,
      image: session?.user?.image as string,
    },
    expires: session?.expires as string,
  }

  return (
    <>
      <HeaderDashboard session={sessionData}/>
      <div>
        <form className="p-8">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-100">
                MODIFICATION DU COURS
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Ces informations seront modifiées dans la base de données et
                seront visibles par les étudiants.
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
                      <option value={categoryLesson[0]?.id}>
                        {categoryLesson[0]?.name}
                      </option>
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
                        placeholder={lesson[0]?.title}
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
                      defaultValue={lesson[0]?.description || ""}
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
                      placeholder={lesson[0]?.repository_url || ""}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      placeholder={lesson[0]?.video_url || ""}
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
                  </div>
                </fieldset>
              </div>
            </div>
          </div>

          <div className="flex items-center  gap-x-6">
            <SecondaryButton type="button">Supprimer le cours</SecondaryButton>
            <PrimaryButton type="submit">Modifier le cours</PrimaryButton>
          </div>
        </form>
      </div>
    </>
  );
}

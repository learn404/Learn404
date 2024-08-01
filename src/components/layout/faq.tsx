import { CreditCard, FlaskConical, HeartHandshake, KeyRound, MailQuestion, TicketPercent } from "lucide-react";

const FaqSection = () => {
  return ( 
    <div id="faq" className="px-6 pb-[12.5rem]">
      <div className="mx-auto max-w-[1436px] flex flex-col items-center">
        <h2 className="text-center text-gray-50 text-3xl sm:text-4xl font-semibold text-balance max-w-xl">
          Vous pourriez vous poser une de ces questions
        </h2>
        <div className="flex flex-col max-lg:items-center lg:flex-row lg:justify-between lg:gap-4 mt-16 w-full">
          <div className="max-w-[648px] space-y-16">
            <div className="md:flex md:items-start md:gap-5">
              <div className="bg-torea-900/50 w-12 md:w-14 aspect-square rounded-sm flex items-center justify-center flex-shrink-0">
                <TicketPercent className="text-torea-200 size-6 md:size-8" />
              </div>
              <div>
                <h3 className="text-gray-50 text-2xl font-bold max-md:mt-3">
                  Est-il possible d'avoir une promotion ?
                </h3>
                <p className="text-gray-400 mt-4">
                  Pour le moment, il n'est pas prévu qu'il y ait de réduction autre que celle du lancement de la plateforme.
                  Le prix a été calculé de manière à ce qu'il puisse être accessible par tout le monde.
                </p>
              </div>
            </div>
            <div className="md:flex md:items-start md:gap-5">
              <div className="bg-torea-900/50 w-12 md:w-14 aspect-square rounded-sm flex items-center justify-center flex-shrink-0">
                <CreditCard className="text-torea-200 size-6 md:size-8" />
              </div>
              <div>
                <h3 className="text-gray-50 text-2xl font-bold max-md:mt-3">
                  Que faire si je n'aime pas les cours ?
                </h3>
                <p className="text-gray-400 mt-4">
                  Si tu n'aimes pas le cours, tu peux demander un remboursement dans les 7 jours après ton achat.
                </p>
              </div>
            </div>
            <div className="md:flex md:items-start md:gap-5">
              <div className="bg-torea-900/50 w-12 md:w-14 aspect-square rounded-sm flex items-center justify-center flex-shrink-0">
                <HeartHandshake className="text-torea-200 size-6 md:size-8" />
              </div>
              <div>
                <h3 className="text-gray-50 text-2xl font-bold max-md:mt-3">
                  Et si j'ai besoin d'aide ?
                </h3>
                <p className="text-gray-400 mt-4">
                  Avec les cours, tu vas avoir accès à des salons privés sur le discord.
                  Si tu bloques, tu peux partager ton problème pour avoir de l'aide.
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-[648px] space-y-16 max-lg:mt-16">
            <div className="md:flex md:items-start md:gap-5">
              <div className="bg-torea-900/50 w-12 md:w-14 aspect-square rounded-sm flex items-center justify-center flex-shrink-0">
                <FlaskConical className="text-torea-200 size-6 md:size-8" />
              </div>
              <div>
                <h3 className="text-gray-50 text-2xl font-bold max-md:mt-3">
                  Puis-je tester les cours ?
                </h3>
                <p className="text-gray-400 mt-4">
                  Non, mais c'est quelque chose auquel on réfléchit pour l'avenir.
                  Cette possibilité pourrait arriver dans le courant de l'année 2025.
                </p>
              </div>
            </div>
            <div className="md:flex md:items-start md:gap-5">
              <div className="bg-torea-900/50 w-12 md:w-14 aspect-square rounded-sm flex items-center justify-center flex-shrink-0">
                <KeyRound className="text-torea-200 size-6 md:size-8" />
              </div>
              <div>
                <h3 className="text-gray-50 text-2xl font-bold max-md:mt-3">
                  Comment fonctionne l'inscription  ?
                </h3>
                <p className="text-gray-400 mt-4">
                Pour avoir accès à la plateforme il faut d'abord créer un compte en ce connectant avec son compte Google ou Github.
                Vous serez ensuite redirigés sur la page de paiement. C'est un <span className="font-semibold">paiement unique</span> pour un <span className="font-semibold">accès à vie</span>.
                </p>
              </div>
            </div>
            <div className="md:flex md:items-start md:gap-5">
              <div className="bg-torea-900/50 w-12 md:w-14 aspect-square rounded-sm flex items-center justify-center flex-shrink-0">
                <MailQuestion className="text-torea-200 size-6 md:size-8" />
              </div>
              <div>
                <h3 className="text-gray-50 text-2xl font-bold max-md:mt-3">
                  Et si j'ai besoin d'aide ?
                </h3>
                <p className="text-gray-400 mt-4">
                Pour nous contacter, vous avez 2 choix qui s'offrent à vous : le premier est d'ouvrir un ticket support sur le
                serveur discord et le second est de nous envoyer un mail à <span className="font-semibold">contact@learn404.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default FaqSection;
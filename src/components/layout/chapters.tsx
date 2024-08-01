"use client";

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const ChaptersSection = () => {

  const slider = useRef<HTMLDivElement>(null);
  const component = useRef<HTMLDivElement>(null); 

  useLayoutEffect(() => {
    if (!slider.current || !component.current) return;

    const mediaQuery = window.matchMedia('(min-width: 1024px)');

    const initGSAPAnimations = () => {
      let ctx = gsap.context(() => {
        let panels = gsap.utils.toArray('.scrollx > section');
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: slider.current,
            pin: true,
            scrub: 1,
            snap: 1 / (panels.length - 1),
            end: () => "+=" + slider.current!.offsetWidth ,
            // markers: true
          }
        });
  
        gsap.to(".mask", {
          width: "100%",
          scrollTrigger: {
            trigger: component.current,
            start: "top left",
            scrub: 1,
            end: () => "+=" + (slider.current!.offsetWidth - 100) ,
          },
        });
  
      }, component);
      return () => ctx.revert();      
    }

    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        initGSAPAnimations();
      } else {
        gsap.killTweensOf('.scrollx > section');
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };

    if (mediaQuery.matches) {
      initGSAPAnimations();
    }

    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      gsap.killTweensOf('.scrollx > section');
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  

  return ( 
    <div className="overflow-hidden relative" ref={component}>
      <div className="lg:flex lg:w-[400vw] max-lg:pb-[6.25rem] scrollx" ref={slider}>
        <svg width="870" height="20" viewBox="0 0 870 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden lg:block absolute top-24 left-[10vw]">
          <path id="Union" fillRule="evenodd" clipRule="evenodd" d="M19.9506 11C19.4489 16.0533 15.1853 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.1853 0 19.4489 3.94668 19.9506 9H283.049C283.551 3.94668 287.815 0 293 0C298.185 0 302.449 3.94668 302.951 9H566.049C566.551 3.94668 570.815 0 576 0C581.185 0 585.449 3.94668 585.951 9H850.049C850.551 3.94668 854.815 0 860 0C865.523 0 870 4.47715 870 10C870 15.5228 865.523 20 860 20C854.815 20 850.551 16.0533 850.049 11H585.951C585.449 16.0533 581.185 20 576 20C570.815 20 566.551 16.0533 566.049 11H302.951C302.449 16.0533 298.185 20 293 20C287.815 20 283.551 16.0533 283.049 11H19.9506Z" fill="#6B7280"/>
          <mask id="mask0_3918_93" className="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="870" height="20">
            <path id="Union" fillRule="evenodd" clipRule="evenodd" d="M19.9506 11C19.4489 16.0533 15.1853 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.1853 0 19.4489 3.94668 19.9506 9H283.049C283.551 3.94668 287.815 0 293 0C298.185 0 302.449 3.94668 302.951 9H566.049C566.551 3.94668 570.815 0 576 0C581.185 0 585.449 3.94668 585.951 9H850.049C850.551 3.94668 854.815 0 860 0C865.523 0 870 4.47715 870 10C870 15.5228 865.523 20 860 20C854.815 20 850.551 16.0533 850.049 11H585.951C585.449 16.0533 581.185 20 576 20C570.815 20 566.551 16.0533 566.049 11H302.951C302.449 16.0533 298.185 20 293 20C287.815 20 283.551 16.0533 283.049 11H19.9506Z" fill="#6B7280"/>
          </mask>
          <g mask="url(#mask0_3918_93)">
            <rect id="Rectangle 21" y="-21" width="5%" height="63" fill="#4F45E6" className='mask'/>
          </g>
        </svg>
          <section className="w-screen pt-16 lg:pt-72 px-6 lg:px-[10vw] lg:h-svh">
            <span className="bg-torea-950 border border-torea-800 rounded-full px-4 py-2 text-gray-50 max-sm:text-sm">
              Débutant
            </span>
            <div className="mt-8">
              <h1 className="text-3xl lg:text-5xl m-0 text-gray-50">
                Prise en main des outils
              </h1>
              <p className="mt-2 text-gray-400 max-w-2xl ">
                Découvre et apprends à utiliser les outils qui feront de toi un développeur.
              </p>
              <div className='flex items-center flex-wrap gap-y-2.5 gap-x-16 mt-8'>
                <div className="space-y-2.5">
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">01</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Le Terminal</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">02</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Visual Studio Code</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">03</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Git</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-screen pt-16 lg:pt-72 px-6 lg:px-[10vw]  lg:h-svh">
            <span className="bg-torea-950 border border-torea-800 rounded-full px-4 py-2 text-gray-50 max-sm:text-sm">
              Débutant
            </span>
            <div className="mt-8">
              <h1 className="text-3xl lg:text-5xl m-0 text-gray-50">
                HTML & CSS
              </h1>
              <p className="mt-2 text-gray-400 max-w-2xl ">
                Crée ton premier site web avec les 2 langages de base du web.
              </p>
              <div className='flex items-center flex-wrap gap-y-2.5 gap-x-16 mt-8'>
                <div className="space-y-2.5">
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">01</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Introduction aux langages du web</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">02</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Créer un site web</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">03</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Structurer le contenu de son site</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">04</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Le balises multimédia</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">05</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Les formulaires HTML</span>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">06</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Stylise ta page avec le CSS</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">07</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Pseudo-classes</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">08</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Pseudo-éléments</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">09</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Bonnes pratiques</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">10</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Projet final</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-screen pt-16 lg:pt-72 px-6 lg:px-[10vw]  lg:h-svh">
            <span className="bg-torea-950 border border-torea-800 rounded-full px-4 py-2 text-gray-50 max-sm:text-sm">
              Débutant
            </span>
            <div className="mt-8">
              <h1 className="text-3xl lg:text-5xl m-0 text-gray-50">
                Javascript
              </h1>
              <p className="mt-2 text-gray-400 max-w-2xl ">
                Découvre le langage de programmation qui rendra ton site web dynamique en ajoutant de la logique et des interactions.
              </p>
              <div className='flex items-center flex-wrap gap-y-2.5 gap-x-16 mt-8'>
                <div className="space-y-2.5">
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">01</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Découverte du langage</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">02</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Variables</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">03</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Opérations de comparaison</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">04</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Conditions</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">05</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Fonctions</span>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">06</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Classes</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">07</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Evènements</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">08</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">API Fetch</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">09</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Fonctions asynchrones</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">10</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Projet final</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-screen pt-16 lg:pt-72 px-6 lg:px-[10vw]  lg:h-[50vh]">
            <span className="bg-torea-950 border border-torea-800 rounded-full px-4 py-2 text-gray-50 max-sm:text-sm">
              Avancé
            </span>
            <div className="mt-8">
              <h1 className="text-3xl lg:text-5xl m-0 text-gray-50">
                Nodejs & Express
              </h1>
              <p className="mt-2 text-gray-400 max-w-2xl ">
                Apprends à utiliser javascript côté serveur pour créer des applications web fullstack.
              </p>
              <div className='flex items-center flex-wrap gap-y-2.5 gap-x-16 mt-8'>
                <div className="space-y-2.5">
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">01</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">Bientôt...</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">02</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">...</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">03</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">...</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">04</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">...</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className="text-gray-50 font-semibold text-lg sm:text-xl lg:text-2xl tabular-nums">05</span>
                    <span className="text-gray-400 font-semibold text-lg sm:text-xl lg:text-2xl">...</span>
                  </div>
                </div>
                
              </div>
            </div>
          </section>
      </div>
  </div>
);
{/* <section style="background-color: lightblue;"></section> */}
}
 
export default ChaptersSection;
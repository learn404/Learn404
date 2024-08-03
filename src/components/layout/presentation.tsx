const PresentationSection = () => {
  return ( 
    <div id="presentation" className="px-6 lg:px-20 max-md:py-16 pb-8 sm:pb-16">
      <div className="flex flex-col items-center justify-center mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-50">
          Présentation du projet
        </h2>
        <div className="w-full max-w-4xl aspect-video bg-gray-950 border border-gray-800 mt-6 rounded-xl">
          <div className="w-full h-full flex items-center justify-center text-2xl text-gray-400">
            Bientôt
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default PresentationSection;
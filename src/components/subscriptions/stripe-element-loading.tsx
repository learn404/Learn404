const StripeElementLoading = () => {
  return ( 
    <div className="text-center">
      <span className="text-lg text-gray-400">Loading</span>
      <div className="flex items-center justify-center gap-2 mt-2">
        <div className="w-2.5 aspect-square rounded-full bg-slate-300 animate-pulse-fab"></div>
        <div className="w-2.5 aspect-square rounded-full bg-slate-300 animate-pulse-fab loading2"></div>
        <div className="w-2.5 aspect-square rounded-full bg-slate-300 animate-pulse-fab loading3"></div>
      </div>
    </div>
   );
}
 
export default StripeElementLoading;
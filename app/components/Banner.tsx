import React from "react"

interface BannerProps {
  text: string
}

const Banner: React.FC<BannerProps> = ({ text }) => {
  return (
    <div className="overflow-hidden w-full bg-primary py-3">
      <div className="whitespace-nowrap animate-banner-scroll text-white font-bold text-lg sm:text-2xl">
        {text}
      </div>
      <style jsx>{`
        @keyframes banner-scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-banner-scroll {
          display: inline-block;
          animation: banner-scroll 20s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default Banner; 
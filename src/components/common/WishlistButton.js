import { Heart } from "lucide-react";

export default function WishlistButton({ isLiked , toggleLike }) {
  return (
    <button 
      onClick={toggleLike}
      className="absolute top-2 right-2 p-1.5 cursor-pointer rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors z-10"
    >
      <Heart 
        size={14} 
        className={isLiked ? "fill-red-500 text-red-500" : "text-gray-600"} 
      />
    </button>
  );
}
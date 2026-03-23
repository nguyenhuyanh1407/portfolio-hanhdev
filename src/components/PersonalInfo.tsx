"use client";
import { Mail, Phone, User } from "lucide-react";

export default function PersonalInfo() {
  return (
    <div className="fixed bottom-8 left-8 z-50 opacity-30 hover:opacity-100 transition-opacity duration-500 pointer-events-auto">
      <div className="flex flex-col gap-3 text-sm text-white/80 font-mono tracking-wider">
         <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-white/50" />
            <span>Nguyễn Huy Anh</span>
         </div>
         <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-white/50" />
            <span>0866650703</span>
         </div>
         <a href="mailto:nguyenhuyanh1407@gmail.com" className="flex items-center gap-3 hover:text-blue-400 transition-colors group">
            <Mail className="w-4 h-4 text-white/50 group-hover:text-blue-400" />
            <span>nguyenhuyanh1407@gmail.com</span>
         </a>
      </div>
    </div>
  );
}

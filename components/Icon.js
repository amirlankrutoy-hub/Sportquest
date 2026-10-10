"use client";

import Image from "next/image";
import {
  Award, Bandage, Building2, CalendarDays, ChartLine, CircleCheck, Clock, Compass, Crown, Dumbbell, Feather, Flame, Gamepad2,
  Gauge, Goal, GraduationCap, Hand, Handshake, Headphones, HeartPulse, Leaf, MapPin, Medal, MessageCircle, Rocket, Shield,
  Sprout, Star, Swords, Target, Trees, TrendingUp, Trophy, Users, UsersRound, Waves, Zap,
} from "lucide-react";

// Иконки вместо эмодзи: в данных хранится имя, здесь — сама картинка
const ICONS = {
  Award, Bandage, Building2, CalendarDays, ChartLine, CircleCheck, Clock, Compass, Crown, Dumbbell, Feather, Flame, Gamepad2,
  Gauge, Goal, GraduationCap, Hand, Handshake, Headphones, HeartPulse, Leaf, MapPin, Medal, MessageCircle, Rocket, Shield,
  Sprout, Star, Swords, Target, Trees, TrendingUp, Trophy, Users, UsersRound, Waves, Zap,
};

export default function Icon({ name, size = 22, className = "", strokeWidth = 2 }) {
  const Cmp = ICONS[name] ?? Star;
  return <Cmp size={size} className={className} strokeWidth={strokeWidth} />;
}

// Круглая миниатюра фото вида спорта или квеста — вместо эмодзи
export function SportThumb({ src, alt = "", className = "h-11 w-11 rounded-xl", ring = true }) {
  return (
    <span className={`relative block shrink-0 overflow-hidden bg-deep ${ring ? "ring-1 ring-white/15" : ""} ${className}`}>
      <Image src={src} alt={alt} fill sizes="96px" className="object-cover" />
    </span>
  );
}

import type { CSSProperties } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getVideoUrl } from "@/lib/supabase";

const VIDEO_SRC = getVideoUrl("22.MOV");

const HEARTS = [
  { left: "8%",  size: "1.1rem", dur: "11s", delay: "0s"   },
  { left: "18%", size: "1.6rem", dur: "14s", delay: "2.5s" },
  { left: "30%", size: "0.9rem", dur: "9s",  delay: "1s"   },
  { left: "44%", size: "1.4rem", dur: "13s", delay: "4s"   },
  { left: "58%", size: "1.0rem", dur: "10s", delay: "0.5s" },
  { left: "70%", size: "1.7rem", dur: "12s", delay: "3s"   },
  { left: "82%", size: "1.2rem", dur: "15s", delay: "6s"   },
  { left: "92%", size: "0.85rem", dur: "8s", delay: "1.8s" },
] as const;

export default function WishPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 text-slate-900">
      {/* Floating hearts */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {HEARTS.map((h, i) => (
          <span
            key={i}
            className="wish-heart"
            style={
              {
                left: h.left,
                "--h-size": h.size,
                "--h-dur": h.dur,
                "--h-delay": h.delay,
              } as CSSProperties
            }
          >
            ❤️
          </span>
        ))}
      </div>

      <main className="relative mx-auto max-w-3xl px-4 pb-8 pt-12 space-y-6">
        {/* Badge */}
        <div className="flex justify-center">
          <Badge variant="secondary" className="px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
            Happy 22nd Birthday 🎂
          </Badge>
        </div>

        {/* Message card */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-pink-100">
          <CardHeader className="text-center pb-3">
            <CardTitle className="text-2xl font-bold text-primary">
              A Birthday Wish For You 💌
            </CardTitle>
          </CardHeader>
          <Separator className="mx-6 mb-0" />
          <CardContent className="pt-5 text-slate-700 text-base leading-8">
            <p>
              Happy Birthday to the most amazing girl! 🎉 It feels like just
              yesterday I was falling for you, and each day since then has been a
              beautiful adventure. You bring so much light and joy into my life,
              and watching you grow and shine is one of my greatest pleasures.
              You&apos;re officially in your golden year (translation: You&apos;re
              getting old, miss 😂). Every moment with you is a gift, and I&apos;m
              so incredibly lucky to have you by my side. I wish you all the best
              and wonderful things life has to offer, and I pray that God grants
              you all your heart&apos;s desires.
            </p>
          </CardContent>
        </Card>

        {/* Video card */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-sky-100">
          <CardHeader className="text-center pb-3">
            <CardTitle className="text-xl font-semibold text-sky-600">
              A Special Memory 🎥
            </CardTitle>
          </CardHeader>
          <Separator className="mx-6 mb-0" />
          <CardContent className="pt-5">
            <video
              className="w-full rounded-xl bg-black block"
              style={{ maxHeight: "68vh" }}
              controls
              playsInline
              preload="metadata"
              src={VIDEO_SRC}
            >
              Your browser does not support this video.
            </video>
          </CardContent>
        </Card>
      </main>

      <footer className="relative flex flex-col items-center gap-3 py-6 text-center">
        <p className="text-xs text-muted-foreground">
          Made with love from Jesse AKA Aromagbaye Moses Chukwu Chukwudi.
        </p>
        <Link href="/">
          <Button variant="outline" size="sm">
            ← Back to start
          </Button>
        </Link>
      </footer>
    </div>
  );
}

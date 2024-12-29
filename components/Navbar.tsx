"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function NavBar() {
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl z-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            {/* logo and brand */}
            <div className="flex items-center space-x-3">
              <Link href={"/"} className="flex items-center space-x-3">
                <div className="h-9 w-9 flex items-center justify-center">
                  <svg
                    width="40px"
                    height="40px"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#0049a8"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M4.35009 13.3929L8 16L11.6499 13.3929C13.7523 11.8912 15 9.46667 15 6.88306V3L8 0L1 3V6.88306C1 9.46667 2.24773 11.8912 4.35009 13.3929Z"
                        fill="#0091ff"
                      />{" "}
                    </g>
                  </svg>
                </div>
                <span className="text-lg font-semibold text-wrap">
                  Safe Report App
                </span>
              </Link>
            </div>

            {/* main navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href={"/submit-report"}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Submit Report
              </Link>
              <Link
                href={"/track-report"}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Track Report
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {/* mobile menu button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="md:hidden p-2 text-zinc-400 hover:text-white">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="bg-black">
                  <SheetHeader>
                    <SheetTitle>Safe Report</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col space-y-4 mt-4">
                    <Link
                      href={"/submit-report"}
                      className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      Submit Report
                    </Link>
                    <Link
                      href={"/track-report"}
                      className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                      Track Report
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

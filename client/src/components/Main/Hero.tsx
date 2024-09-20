"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Navbar from "./Navbar";
import { Button } from "../ui/button";
import LoginOptions from "../LoginOptions";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref) as boolean;

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: +10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <section className="w-full min-h-screen px-5 py-12 justify-center lg:grid flex flex-col-reverse lg:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <motion.div
        initial="hidden"
        ref={ref}
        animate={isInView ? "show" : "hidden"}
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <Navbar />
        <motion.h1
          className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-green-500 to-green-400 text-transparent bg-clip-text pb-5"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          Susply
        </motion.h1>
        <motion.h1
          className="text-base md:text-lg mb-4 md:mb-6"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          Unlocking Sustainable Supply Chain solutions with ease.
        </motion.h1>

        <motion.div
          className="flex flex-wrap gap-3"
          variants={FADE_UP_ANIMATION_VARIANTS}
        >
          <AlertDialog>
            <AlertDialogTrigger>
              <Button>Get Started</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-5xl">
              <LoginOptions />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Link href="/products">
            <Button variant={"ghost"} className="flex gap-1">
              <div>View Products</div>
              <ArrowRight className="w-4" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
      <div className="w-80 lg:w-auto">
        <img src="/cargo.svg" alt="cargo" className="md:flex w-80 md:w-full" />
      </div>
    </section>
  );
};

export default Hero;

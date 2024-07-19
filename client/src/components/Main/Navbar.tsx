import React from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import Logo from "@/components/Logo";
import LoginOptions from "../LoginOptions";
import RegisterOptions from "../RegisterOptions";
import { Github } from "lucide-react";

const Navbar = () => {
  return (
    <div className="fixed backdrop-blur-md top-0 p-5 w-full flex justify-center left-0 z-50 bg-white">
      <div className="flex max-w-6xl w-full justify-between items-center">
        <div>
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="flex gap-3">
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant={"ghost"}>Sign Up</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-5xl">
              <RegisterOptions />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger>
              <Button>Sign In</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-5xl">
              <LoginOptions />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Link href="https://github.com/srajankumar/susply" target="_blank">
            <Button variant={"ghost"} size={"icon"}>
              <Github className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

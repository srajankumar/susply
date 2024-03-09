import React from "react";

import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deserialize } from "v8";
import Image from "next/image";
import Logo from "@/components/Logo";
import Logout from "@/components/Logout";
const Navbar = () => {
  return (
    <div className="fixed backdrop-blur-md top-0 p-5 w-full flex justify-center left-0 z-50 bg-white">
      <div className="flex max-w-6xl w-full justify-between items-center">
        <div>
          <Link href="/shipment-provider">
            <Logo />
          </Link>
        </div>
        <div className="flex gap-5">
          <Link href="/shipment-provider/orders">
            <Button>Orders</Button>
          </Link>
          <Link href="/shipment-provider/shipments">
            <Button>Shipments</Button>
          </Link>
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

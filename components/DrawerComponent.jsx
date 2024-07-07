"use client";
import React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { MenuIcon } from "lucide-react";

const DrawerComponent = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return isDesktop ? (
    <div>Desktop</div>
  ) : (
    <div>
      <Drawer direction="right">
        <DrawerTrigger>
          <MenuIcon />
        </DrawerTrigger>
        <DrawerContent>some content</DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerComponent;

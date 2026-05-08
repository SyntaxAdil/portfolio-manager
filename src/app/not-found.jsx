import React from "react";
import { Button } from "../components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <section className="flex items-center justify-center min-h-[80dvh]">
      <div className="container text-center">
        <h3 className="text-primary font-bold text-9xl">404</h3>
        <p className="text-gray-500">Page not found</p>
        <Button asChild className={"mt-6"}>
          <Link href={"/"}>Go to home</Link>
        </Button>
      </div>
    </section>
  );
};

export default NotFound;

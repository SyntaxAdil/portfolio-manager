import React from "react";

import Link from "next/link";
import { Button } from "../../components/ui/button";

const EditPage = () => {
  return (
    <section className="flex items-center justify-center min-h-[80dvh]">
      <div className="container text-center">
        <h3 className="text-primary font-bold text-7xl md:text-9xl">
          Coming Soon
        </h3>

        <p className="text-gray-500 mt-4 max-w-md mx-auto">
          This feature is currently under development and will be available
          soon.
        </p>

        <Button asChild className="mt-6">
          <Link href="/">Go to home</Link>
        </Button>
      </div>
    </section>
  );
};

export default EditPage;

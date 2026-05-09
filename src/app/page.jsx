import React from "react";
import { ProjectCard } from "../components/project/ProjectCard";
import { auth } from "../lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ApiGuide from "../components/ApiGuide";

const getProject = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/project/${id}`
    ,{cache:"no-store"}
  );
  const data = await res.json();
  return data.data;
};

const Home = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user?.id) {
    redirect("/login");
  }

  const projects = await getProject(user?.id);

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Main content */}
      <div className="flex-1 min-w-0 w-full">
        <div className="text-center my-4">
          <h3 className="text-primary font-bold text-4xl capitalize mb-2">
            All Projects
          </h3>
          <p className="text-sm text-gray-500">
            All your projects are in one place.
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-8 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-center mt-16 text-gray-600">No Projects yet</p>
        )}
      </div>

      {/* Sidebar */}
      <aside className="w-full lg:w-80 lg:shrink-0 lg:sticky lg:top-24">
        <ApiGuide />
      </aside>
    </div>
  );
};

export default Home;
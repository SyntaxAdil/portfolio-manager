import React from "react";
import connectDB from "../lib/db";
import Projects from "../model/project-model";
import { ProjectCard } from "../components/project/ProjectCard";
import Image from "next/image";

const getProject = async () => {
  await connectDB();
  return Projects.find();
};

const Home = async () => {
  const projects = await getProject();
  return (
    <div>
      <div className="text-center my-4">
        <h3 className=" text-primary font-bold  text-4xl capitalize mb-2">
          All Projects
        </h3>
        <p className="text-sm text-gray-500">
          All your projects are in one place.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-8 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
      
    </div>
  );
};

export default Home;

import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";

import { EditPopUp } from "../model/EditPopUp";
import { DltPopUp } from "../model/DltPopUp";

const Github=()=>{
  return(// Github icon টা এইভাবে replace করো

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="14"
  height="14"
  viewBox="0 0 24 24"
  fill="currentColor"
>
  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
</svg>)
}

export function ProjectCard({ project }) {
  return (
    <Card className="group w-full max-w-sm overflow-hidden rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-0">

      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <Image
          width={1000}
          height={1000}
          src={project.image}
          alt={project?.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-400" />

        {/* Hover Links */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Button asChild size="sm" variant="secondary" className="rounded-xl backdrop-blur-sm bg-white/90 text-black hover:bg-white">
            <a href={project?.github} target="_blank" rel="noopener noreferrer">
              <Github size={14} />
              Github
            </a>
          </Button>
          <Button asChild size="sm" className="rounded-xl">
            <a href={project?.live} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={14} />
              Live
            </a>
          </Button>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-5 space-y-3">
        <div className="space-y-1.5">
          <h3 className="font-semibold text-base leading-snug line-clamp-1">
            {project?.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {project?.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <Badge key={t.id} variant="secondary" className="rounded-md text-xs font-medium">
              {t?.tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <Separator />

      {/* Footer */}
      <CardFooter className="p-4 gap-2">
        <EditPopUp project={project} />
        <DltPopUp project={project} />
      </CardFooter>

    </Card>
  );
}
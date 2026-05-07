import Image from "next/image";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

export function ProjectCard({ project }) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/20 h-100 ">


      <div className="overflow-hidden">
        <Image
          width={1000}
          height={1000}
          src={project.image}
          alt={project?.title}
          className="relative z-20 aspect-video w-full object-cover transition-transform duration-500 hover:scale-110"
        />
        
      </div>

      <CardHeader className="transition-all duration-300">
        <CardTitle className="transition-colors duration-300 hover:text-primary">
          {project?.title}
        </CardTitle>
        <CardDescription className={"line-clamp-3"} >{project?.description}</CardDescription>
      </CardHeader>

      <CardAction className={"flex flex-wrap gap-2 ms-4"}>
        {project.tech.map((t) => (
          <Badge
            variant="secondary"
            key={t.id}
            className="transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white"
          >
            {t?.tag}
          </Badge>
        ))}
      </CardAction>

      <CardFooter className={"gap-4 mt-auto"}>
        <Button
          variant="secondary"
          className="transition-all duration-300 hover:scale-105"
        >
          <a href={project?.github}>Github</a>
        </Button>

        <Button className="transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <a href={project?.live}>Live</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
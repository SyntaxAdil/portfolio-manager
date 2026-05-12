"use client";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./../ui/dialog";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Edit, InfoIcon, Plus, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

// tag component (from AddProject)
export const Techstack = ({ children, onClick }) => {
  return (
    <Badge className="bg-white w-26 px-4 py-3 flex items-center justify-between gap-2">
      <span className="truncate capitalize">{children}</span>
      <button onClick={onClick} type="button">
        <X size={18} />
      </button>
    </Badge>
  );
};

export function EditPopUp({ project }) {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState(project.tech || []);
  const [tagInput, setTagInput] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: project.title,
      image: project.image,
      description: project.description,
      github: project.github,
      live: project.live,
    },
  });

  // add tag
  const addToTag = () => {
    if (!tagInput) return;

    setTags((prev) => [...prev, { tag: tagInput, id: crypto.randomUUID() }]);
    setTagInput("");
  };

  const removeTag = (id) => {
    setTags((prev) => prev.filter((i) => i.id !== id));
  };

  const onSubmit = async (data) => {
    const updatedProject = {
      _id: project._id,
      ...data,
      tech: tags,
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/project`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProject),
    });

    const result = await res.json();

    if (result.success) {
      router.refresh();
      reset();
      setTags([]);
      setTagInput("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <span className="flex items-center gap-2">
            <Edit size={16} />
            Edit
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto px-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Make changes to your project here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="my-4">
            {/* TITLE + IMAGE */}
            <FieldGroup className={"md:flex-row"}>
              <Field>
                <FieldLabel>Project Title</FieldLabel>
                <Input
                  placeholder="Skillsphere"
                  {...register("title", {
                    required: "Title is required",
                  })}
                />
                {errors.title && (
                  <FieldDescription className="text-red-500">
                    {errors.title.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel>Thumbnail url</FieldLabel>
                <Input
                  placeholder="https://image.com"
                  {...register("image", {
                    required: "Image is required",
                  })}
                />
                <FieldDescription className="flex items-center gap-1 flex-wrap">
                  <InfoIcon size={14} /> Visit{" "}
                  <a href="https://imgbb.com/" target="_blank">
                    ImgBB
                  </a>{" "}
                  to generate image URL Free.
                </FieldDescription>
                {errors.image && (
                  <FieldDescription className="text-red-500">
                    {errors.image.message}
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>

            {/* DESCRIPTION */}
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea
                placeholder="Type your project description here."
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <FieldDescription className="text-red-500">
                  {errors.description.message}
                </FieldDescription>
              )}
            </Field>

            {/* LINKS */}
            <FieldGroup className={"flex flex-col md:flex-row"}>
              <Field>
                <FieldLabel>Github Repository</FieldLabel>
                <Input
                  placeholder="github link"
                  {...register("github", {
                    required: "Github link required",
                  })}
                />
                {errors.github && (
                  <FieldDescription className="text-red-500">
                    {errors.github.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel>Live Link</FieldLabel>
                <Input
                  placeholder="live link"
                  {...register("live", {
                    required: "Live link required",
                  })}
                />
                {errors.live && (
                  <FieldDescription className="text-red-500">
                    {errors.live.message}
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>

            {/* TECH STACK */}
            <Field>
              <FieldLabel>Tech Stack</FieldLabel>

              <div className="flex gap-2 flex-col md:flex-row">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Next JS"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addToTag();
                    }
                  }}
                />

                <Button type="button" variant="secondary" onClick={addToTag}>
                  Add Stack
                </Button>
              </div>
            </Field>

            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <Techstack key={tag.id} onClick={() => removeTag(tag.id)}>
                  {tag.tag}
                </Techstack>
              ))}
            </div>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  reset();
                  setTags([]);
                  setTagInput("");
                }}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

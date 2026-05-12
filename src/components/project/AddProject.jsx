"use client";

import { InfoIcon, Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// tag component (UNCHANGED)
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

const AddProject = () => {
  const router = useRouter();

  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const projectForm = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // add tag (UNCHANGED logic)
  const addToTag = () => {
    if (!tagInput) return;

    setTags((prev) => [...prev, { tag: tagInput, id: crypto.randomUUID() }]);

    setTagInput("");
  };

  const removeTag = (id) => {
    setTags((prev) => prev.filter((i) => i.id !== id));
  };

  const onSubmit = async (data) => {
    const newProject = {
      ...data,
      tech: tags,
    };
    console.log(newProject);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/api/project`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });

    const result = await res.json();

    if (result.success) {
      toast.success("Project created successfully")
      router.push("/");
      reset();
      setTags([]);
      setTagInput("");
    }else{
      
      toast.error("Something went wrong while creating the project.")
    }
  };

  return (
    <section className="my-4">
      <form
        ref={projectForm}
        onSubmit={handleSubmit(onSubmit)}
        className="border max-w-2xl mx-auto p-6 rounded-lg mt-6"
      >
        <FieldGroup>
          {/* TITLE + IMAGE */}
          <FieldGroup className={"md:flex-row "}>
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

          {/* TECH STACK (UNCHANGED UI) */}
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

          {/* ACTIONS (UNCHANGED UI) */}
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setTags([]);
                setTagInput("");
              }}
            >
              Reset
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              <Plus />
              {isSubmitting ? "Adding..." : "Add Project"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </section>
  );
};

export default AddProject;

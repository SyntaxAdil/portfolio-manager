"use client";

import { InfoIcon, Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { useRef, useState } from "react";
import { addProject } from "../../lib/porject";

// tag component
export const Techstack = ({ children, onClick }) => {
  return (
    <Badge className="bg-white w-26 px-4 py-3 flex items-center justify-between gap-2">
      <span className="truncate capitalize">{children}</span>
      <button onClick={onClick} type="button" className="cursor-pointer ">
        <X size={18} />
      </button>
    </Badge>
  );
};

const AddProject = () => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const projectForm = useRef(null);

  const addToTag = () => {
    if (!tagInput) return;
    const newTag = {
      tag: tagInput,
      id: crypto.randomUUID(),
    };
    setTags((prev) => [...prev, newTag]);
    setTagInput("");
  };

  const removeTag = (id) => {
    if (!id) return;
    setTags((prev) => prev.filter((i) => i.id !== id));
  };

  const handleKeyDowmForTag = (e) => {
    if (!tagInput) return;
    if (e.key === "Enter") {
      e.preventDefault();
      addToTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const newProject = Object.fromEntries(formdata.entries());
    newProject.tags = tags;

    await addProject(newProject);

    resetForm();
  };

  const resetForm = () => {
    projectForm.current.reset();
    setTagInput("");
    setTags([]);
  };
  return (
    <section className="my-4">
      <form
        ref={projectForm}
        onSubmit={handleSubmit}
        className="border max-w-2xl mx-auto p-6 rounded-lg mt-6"
      >
        <FieldGroup>
          <FieldGroup className={"md:flex-row "}>
            {/* title */}
            <Field>
              <FieldLabel htmlFor="fieldgroup-title">Project Title</FieldLabel>
              <Input
                name="title"
                id="fieldgroup-title"
                placeholder="Skillsphere"
              />
            </Field>
            {/* image link */}
            <Field>
              <FieldLabel htmlFor="fieldgroup-iamge">Thumbnail url</FieldLabel>
              <Input
                id="fieldgroup-image"
                name="image"
                placeholder="https://ibb.co.com/6JwMkHFm"
              />
              <FieldDescription
                className={"flex items-center gap-1  flex-wrap"}
              >
                <InfoIcon size={14} /> Visit
                <a href="https://imgbb.com/" target="_blank">
                  ImgBB
                </a>{" "}
                to generate image URL Free.
              </FieldDescription>
            </Field>
          </FieldGroup>
          {/* desription */}
          <Field>
            <FieldLabel htmlFor="fieldgroup-descripion">Description</FieldLabel>
            <Textarea
              name="description"
              id="fieldgroup-descripion"
              placeholder="Type your project description here."
            />
          </Field>
          {/* links */}
          <FieldGroup className={"flex  flex-col md:flex-row"}>
            {/* github  */}
            <Field>
              <FieldLabel htmlFor="fieldgroup-gtihub">
                Github Repository
              </FieldLabel>
              <Input
                name="github"
                id="fieldgroup-github"
                placeholder="https://github.com/SyntaxAdil/portfolio-manager"
              />
            </Field>

            {/* live */}

            <Field>
              <FieldLabel htmlFor="fieldgroup-live">Live Link</FieldLabel>
              <Input
                name="live"
                id="fieldgroup-live"
                placeholder="https://abdur-rahman-dev.vercel.app"
              />
            </Field>
          </FieldGroup>

          <Field>
            <FieldLabel htmlFor="fieldgroup-tech">Tech Stack</FieldLabel>
            <div className="flex  gap-2 flex-col md:flex-row ">
              <Input
                id="fieldgroup-tech"
                placeholder="Next JS 16.2 "
                value={tagInput}
                onKeyDown={handleKeyDowmForTag}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <Button
                variant="secondary"
                type="button"
                className={"rounded w-full md:w-fit"}
                onClick={addToTag}
              >
                Add Stack
              </Button>
            </div>
          </Field>

          <div className="flex  gap-2 flex-wrap">
            {tags.map((tag) => (
              <Techstack key={tag.id} onClick={() => removeTag(tag.id)}>
                {" "}
                {tag.tag}
              </Techstack>
            ))}
          </div>
          <Field orientation="horizontal">
            <Button
              onClick={resetForm}
              type="button"
              variant="outline"
              className={"flex-1 md:flex-0"}
            >
              Reset
            </Button>
            <Button type="submit" className={"flex-1 md:flex-0"}>
              {" "}
              <Plus></Plus>Add Project
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </section>
  );
};

export default AddProject;

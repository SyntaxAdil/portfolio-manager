"use client";

import { InfoIcon, Plus, X } from "lucide-react";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { useState } from "react";

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
  return (
    <section className="my-4">
      <form action="">
        <FieldGroup className={"max-w-xl mx-auto"}>
          {/* title */}
          <Field>
            <FieldLabel htmlFor="fieldgroup-title">Project Title</FieldLabel>
            <Input id="fieldgroup-name" placeholder="Skillsphere" />
          </Field>
          {/* image link */}
          <Field>
            <FieldLabel htmlFor="fieldgroup-title">Thumbnail url</FieldLabel>
            <Input
              id="fieldgroup-name"
              placeholder="https://ibb.co.com/6JwMkHFm"
            />
            <FieldDescription className={"flex items-center gap-1"}>
              <InfoIcon size={14} className="mt-0.5" /> You can use{" "}
              <a href="https://imgbb.com/" target="_blank">
                ImgBB
              </a>{" "}
              to generate an image URL.
            </FieldDescription>
          </Field>
          {/* desription */}
          <Field>
            <FieldLabel htmlFor="fieldgroup-descripion">Description</FieldLabel>
            <Textarea
              id="fieldgroup-descripion"
              placeholder="Type your project description here."
            />
          </Field>
          {/* links */}
          <FieldGroup className={"flex flex-row"}>
            {/* github  */}
            <Field>
              <FieldLabel htmlFor="fieldgroup-gtihub">
                Github Repository
              </FieldLabel>
              <Input
                id="fieldgroup-github"
                placeholder="https://github.com/SyntaxAdil/portfolio-manager"
              />
            </Field>

            {/* live */}

            <Field>
              <FieldLabel htmlFor="fieldgroup-live">Live Link</FieldLabel>
              <Input
                id="fieldgroup-live"
                placeholder="https://abdur-rahman-dev.vercel.app"
              />
            </Field>
          </FieldGroup>

          <Field>
            <FieldLabel htmlFor="fieldgroup-tech">Tech Stack</FieldLabel>
            <div className="flex  gap-2">
              <Input
                id="fieldgroup-tech"
                placeholder="Next JS 16.2 "
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
              />
              <Button type="button" className={"rounded"} onClick={addToTag}>
                <Plus></Plus>
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
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </Field>
        </FieldGroup>
      </form>
    </section>
  );
};

export default AddProject;

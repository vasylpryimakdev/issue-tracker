"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDA from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssue = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title"></TextField.Input>
      </TextField.Root>
      <SimpleMDA placeholder="Description"></SimpleMDA>
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssue;

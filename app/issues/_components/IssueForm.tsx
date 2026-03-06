"use client";

import { Button, CalloutRoot, CalloutText, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchemas";
import z from "zod";
import { ErrorMessage, Spinner } from "@/app/components";
import { Issue } from "@prisma/client";
import SimpleMDA from "react-simplemde-editor";

type IssueForm = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
  });

  const [error, serError] = useState("");
  const [isSubmit, setSubmit] = useState(false);

  const router = useRouter();

  const onSubmit = handleSubmit(async (data: IssueForm) => {
    setSubmit(true);
    try {
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post("/api/issues", data);
      }

      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      serError("An unexpected error occured!");
    } finally {
      setSubmit(false);
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <CalloutRoot color="red" className="mb-5">
          <CalloutText>{error}</CalloutText>
        </CalloutRoot>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          ></TextField.Input>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDA placeholder="Description" {...field}></SimpleMDA>
          )}
        />
        <ErrorMessage> {errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmit}>
          {issue ? "Update Issue" : "Submit New Issue"}
          {isSubmit && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;

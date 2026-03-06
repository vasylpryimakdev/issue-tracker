"use client";

import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
} from "@radix-ui/themes";
import React from "react";

const AssigneeSelect = () => {
  return (
    <SelectRoot>
      <SelectTrigger placeholder="Assing..."></SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Suggestions</SelectLabel>
          <SelectItem value="1">Something</SelectItem>
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  );
};

export default AssigneeSelect;

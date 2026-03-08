import prisma from "@/prisma/client";
import {
  Link,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
} from "@radix-ui/themes";
import NextLink from "next/link";
import React from "react";
import IssueActions from "./IssueActions";
import { IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon } from "@radix-ui/react-icons";

enum sortOptions {
  ASC = "asc",
  DESC = "desc",
}

interface Column {
  label: string;
  value: keyof Issue;
  className?: string;
}

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue; sort: sortOptions };
}

const columns: Column[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

const IssuesPage = async ({ searchParams }: Props) => {
  const validStatuses = Object.values(Status);
  const filterByStatus = validStatuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const sortBy = Object.values(sortOptions).includes(searchParams.sort)
    ? searchParams.sort
    : sortOptions.ASC;
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: sortBy }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status: filterByStatus },
    orderBy: orderBy,
  });

  return (
    <div>
      <IssueActions />
      <TableRoot variant="surface">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableColumnHeaderCell
                key={column.value}
                className={`${column.className} relative`}
              >
                <NextLink
                  href={{
                    query: {
                      orderBy: column.value,
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowDownIcon className="absolute inline self-center" />
                )}
              </TableColumnHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;

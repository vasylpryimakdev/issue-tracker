import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "./issues/LatestIssue";
import IssueSummary from "./IssueSummary";
import { Metadata } from "next";
import { getIssueCounts } from "@/lib/prismaCount";

export default async function Home() {
  const countedByStatus = await getIssueCounts();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary statistic={countedByStatus} />
        <IssueChart statistic={countedByStatus} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};

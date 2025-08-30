import { Team } from "@/pages/3.team/Team";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/team/$id")({
  component: Team,
});

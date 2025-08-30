import { Player } from "@/pages/4.player/Player";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/player/$id")({
  component: Player,
});

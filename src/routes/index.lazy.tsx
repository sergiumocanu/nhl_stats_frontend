import { Home } from "@/pages/1.home/Home";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Home,
});

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/player/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/player/" i love you so much!</div>;
}

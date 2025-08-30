import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/game/$id")({
  component: Game,
});

function Game() {
  const { id } = Route.useParams();
  return <div>Hello "/game/${id}"!</div>;
}

import { useParams } from "react-router-dom";

export default function PlayerPage() {
  const { playerId } = useParams();

  return (
    <div>
      <h1>Player {playerId}</h1>
    </div>
  );
}

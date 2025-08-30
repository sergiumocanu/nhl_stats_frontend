import { useParams } from "react-router-dom";

export default function TeamPage() {
  const { teamId } = useParams();

  return (
    <div>
      <h1>Team {teamId}</h1>
    </div>
  );
}

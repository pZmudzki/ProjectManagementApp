import { useParams } from "react-router-dom";
import React from "react";

import Projects from "../components/DashboardComponents/Projects";

export default function ProjectWrapper() {
  const { id } = useParams();
  return <Projects filterProject={id} />;
}

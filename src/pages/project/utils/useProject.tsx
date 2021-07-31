import { useState, useEffect } from "react";
import { IProject } from "../../../interfaces/project.interface";

interface returnType {
  loading: boolean;
  project: IProject | Record<never, never>;
}
export const useProject = (id: string): returnType => {
  const [project, setProject] = useState<IProject | Record<never, never>>({});
  const [loading, setLoading] = useState<boolean>(true);

  //const url = "/project/" + id;
  const url = "https://jsonplaceholder.typicode.com/todos/1";

  useEffect(() => {
    const fetchProject = async (id: string) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setProject(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchProject(id);
  }, [id]);

  return { loading, project };
};

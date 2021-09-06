import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IInfraction } from "../../interfaces/infraction.interface";
import { RootState } from "../../store";
import { Link } from "react-router-dom";
import "./infractions.css";

export const Infractions = () => {
  const [infractions, setInfractions] = useState<IInfraction[]>([]);
  const userInfoMeta = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userInfoMeta;

  const getInfractions = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const infractions: any = await axios.get("/api/admin/infractions", config);
    setInfractions(infractions.data);
  };

  const handleDeleteProject = async (id: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.get(`/api/admin/remove-project/${id}`, config);
    await getInfractions();
  };

  const handleBanUser = async (id: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.get(`/api/admin/ban-user/${id}`, config);
    await getInfractions();
  };

  const handleIgnoreInfraction = async (id: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.get(`/api/admin/ignore-infraction/${id}`, config);
    await getInfractions();
  };
  useEffect(() => {
    getInfractions();
  }, []);

  return (
    <div>
      <table className="infractions">
        <tr>
          <th>User</th>
          <th>Project</th>
          <th>Reports</th>
          <th>Actions</th>
        </tr>
        {infractions &&
          infractions?.map((infraction: any) => (
            <tr>
              <td>{`${infraction.convict.firstName} ${infraction.convict.lastName} (${infraction.convict.email})`}</td>
              <td>
                <Link to={`/project/${infraction.project?._id}`}>
                  {infraction.project?.name}
                </Link>
              </td>
              <td>{infraction.reporters.length}</td>
              <td>
                <button
                  onClick={() => {
                    handleDeleteProject(infraction._id);
                  }}
                >
                  Delete Project
                </button>
                <button
                  onClick={() => {
                    handleBanUser(infraction._id);
                  }}
                >
                  Ban User
                </button>
                <button
                  onClick={() => {
                    handleIgnoreInfraction(infraction._id);
                  }}
                >
                  Ignore Infraction
                </button>
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
};

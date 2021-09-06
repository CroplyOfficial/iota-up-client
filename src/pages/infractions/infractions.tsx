import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IInfraction } from "../../interfaces/infraction.interface";
import { RootState } from "../../store";
import { Link } from "react-router-dom";
import { Modal, Button } from "@material-ui/core";
import "./infractions.css";

export const Infractions = () => {
  const [infractions, setInfractions] = useState<IInfraction[]>([]);
  const userInfoMeta = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userInfoMeta;
  const [open, setOpen] = useState<boolean>(false);

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

  const [action, setAction] = useState<string>();
  const [id, setId] = useState<string>();

  const commitAction = (act: string, id: string) => {
    switch (act) {
      case "delete":
        handleDeleteProject(id);
        setId("");
        setAction("");
        setOpen(false);
        return;
      case "ban":
        handleBanUser(id);
        setId("");
        setAction("");
        setOpen(false);
        return;
      case "ignore":
        handleIgnoreInfraction(id);
        setId("");
        setAction("");
        setOpen(false);
        return;
      default:
        return;
    }
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
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <div className="modal">
          <h1>Confirm {action}</h1>
          <p>are you sure you want to go forward?</p>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              if (!(action && id)) return;
              commitAction(action, id);
            }}
          >
            CONFIRM
          </Button>
        </div>
      </Modal>
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
                    setId(infraction._id);
                    setAction("delete");
                    setOpen(true);
                  }}
                >
                  Delete Project
                </button>
                <button
                  onClick={() => {
                    setId(infraction._id);
                    setAction("ban");
                    setOpen(true);
                  }}
                >
                  Ban User
                </button>
                <button
                  onClick={() => {
                    setId(infraction._id);
                    setAction("ignore");
                    setOpen(true);
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

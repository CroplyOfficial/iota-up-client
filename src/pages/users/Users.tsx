import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { IUser } from "../../interfaces/user.interface";
import { Modal, Button } from "@material-ui/core";
import "../infractions/infractions.css";

export const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const userInfoMeta = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userInfoMeta;
  const [open, setOpen] = useState<boolean>(false);

  const getUsers = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const infractions: any = await axios.get("/api/admin/list-users", config);
    setUsers(infractions.data);
  };

  const handleBanUser = async (id: string) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.get(`/api/admin/ban-user-by-id/${id}`, config);
    await getUsers();
  };

  const [action, setAction] = useState<string>();
  const [id, setId] = useState<string>();

  const commitAction = (act: string, id: string) => {
    switch (act) {
      case "ban":
        handleBanUser(id);
        setId("");
        setAction("");
        setOpen(false);
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    getUsers();
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
          <th>Projects</th>
          <th>isBanned</th>
          <th>isAdmin</th>
          <th>Actions</th>
        </tr>
        {users &&
          users?.map((user: IUser) => (
            <tr>
              <td>
                <div className="user-info">
                  <img
                    src={user.avatar}
                    alt={user.username ?? user.firstName}
                    className="user-avatar"
                  />
                  <div className="user-info-data">
                    {`${user.firstName} ${user.lastName}`}
                    <br />
                    {`(${user.email}) (${user.username})`}
                  </div>
                </div>
              </td>
              <td>
                <ul>
                  {user.projects && user.projects.length > 0 ? (
                    user.projects?.map((project: any) => (
                      <li>
                        <a href={`/project/${project._id}`}>{project.name}</a>
                      </li>
                    ))
                  ) : (
                    <li>No projects</li>
                  )}
                </ul>
              </td>
              <td>{String(user.isBanned)}</td>
              <td>{String(user.isAdmin)}</td>
              <td>
                <button
                  onClick={() => {
                    setId(user._id);
                    setAction("ban");
                    setOpen(true);
                  }}
                >
                  Ban User
                </button>
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
};

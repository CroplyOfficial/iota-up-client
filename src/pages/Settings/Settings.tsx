import { useSelector } from "react-redux";
import axios from "axios";
import React, { useState } from "react";
import { RootState } from "../../store";
import { IUser } from "../../interfaces/user.interface";

interface IProps {
  toggleLoginModal: () => void;
}
const Settings = (props: IProps) => {
  const [wallet, setWallet] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const userMeta = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userMeta;

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const userUpdated = await axios.put(
      "/api/users/me",
      {
        wallet,
        city,
        country,
        skills,
      },
      config
    );

    console.log(userUpdated);
  };

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <label>Wallet</label>
        <input
          type="text"
          onKeyUp={(e: any) => setWallet(e.target.value)}
          placeholder="iota:123"
        />
        <label>Skills</label>
        <input
          type="text"
          onKeyUp={(e: any) => setSkills([e.target.value])}
          placeholder="JS, TSX, Coding, Cooking..."
        />
        <label>City</label>
        <input
          type="text"
          onKeyUp={(e: any) => setCity(e.target.value)}
          placeholder="City"
        />
        <label>Country</label>
        <input
          type="text"
          onKeyUp={(e: any) => setCountry(e.target.value)}
          placeholder="Country"
        />
        <input type="submit" value="CONFIRM" />
      </form>
    </div>
  );
};

export { Settings };

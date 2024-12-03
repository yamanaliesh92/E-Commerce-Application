import { useState, useEffect } from "react";
import axios from "axios";

type User = {
  id: number;
  email: string;
  username: string;
  createdAt: Date;
};

const useFetchUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/user/getMe");
        const { id, email, username, createdAt } = response.data;
        setUser({ id, email, username, createdAt });
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return user;
};

export default useFetchUser;
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/authentication";
import axios from "axios";

export default function HomeTest() {
  const [data, setData] = useState([]);

  const { logout } = useAuth();

  const getData = async () => {
    try {
      const result = await axios(`http://localhost:3000/api/rooms`);
      console.log(result.data);
      setData(result.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <p>Test Test</p>
      <button onClick={logout}>log out</button>
      <div>
        <div>
          {data.map((item) => {
            console.log(item.main_image);
            return (
              <>
                <img src={item.main_image} />
                <p>{item.type_name}</p>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

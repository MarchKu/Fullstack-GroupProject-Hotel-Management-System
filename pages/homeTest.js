import { useState } from "react";
import { useAuth } from "@/contexts/authentication";

export default function HomeTest() {
  const { logout } = useAuth();
  return (
    <>
      <p>Test Test</p>
      <button onClick={logout}>log out</button>
    </>
  );
}

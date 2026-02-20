import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const navigate = useNavigate();
  useEffect(() => { navigate("/#join", { replace: true }); }, [navigate]);
  return null;
};

export default Join;

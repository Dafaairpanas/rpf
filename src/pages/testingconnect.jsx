import { useEffect, useState } from "react";
import api from "@/api/axios";

export default function Testing() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/ping")
      .then((res) => setData(res.data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Laravel + React Connection Test</h1>
      {error && <pre>{error}</pre>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}

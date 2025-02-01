import { useEffect } from "preact/hooks";

export default function About() {
  useEffect(() => {
    const fetchResponse = async () => {
      const response = await fetch("/api/users");
      if (!response.ok) {
        console.log("Failure");
      } else {
        const data = await response.json();
        console.log(data);
      }
    };

    fetchResponse();
  }, []);

  return (
    <div>
      <h1>The About Page</h1>
    </div>
  );
}

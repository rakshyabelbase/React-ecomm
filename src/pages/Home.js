import Jumbotron from "../components/cards/Jumbotron";
import { useAuth } from "../context/auth";

export default function Home() {
    const [auth, setAuth] =useAuth();
  return (
    <div>
      <Jumbotron title="Hello World" subTitle="Welcome to React E-commerce" />
      <h1>Home Page</h1>
    </div>
  );
}

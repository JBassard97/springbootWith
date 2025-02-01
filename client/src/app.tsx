import { Router, Route } from "preact-router";
import Home from "./pages/Home";
import About from "./pages/About";

export function App() {
  return (
    <div>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </Router>
    </div>
  );
}

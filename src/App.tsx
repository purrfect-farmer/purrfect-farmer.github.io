import { Show, type Component } from "solid-js";
import { IS_WHISKERS } from "./lib/client";
import Cloud from "./partials/Cloud";
import Download from "./partials/Download";
import Farmers from "./partials/Farmers";
import Features from "./partials/Features";
import Footer from "./partials/Footer";
import Hero from "./partials/Hero";
import Mirror from "./partials/Mirror";
import Mobile from "./partials/Mobile";
import SidePanel from "./partials/SidePanel";
import Toolbar from "./partials/Toolbar";
import Whiskers from "./partials/Whiskers";

const App: Component = () => {
  return (
    <>
      <Hero />
      <Features />
      <Farmers />
      <Mirror />
      <SidePanel />
      <Toolbar />
      <Mobile />
      <Cloud />
      <Whiskers />
      <Show when={!IS_WHISKERS}>
        <Download />
      </Show>
      <Footer />
    </>
  );
};

export default App;

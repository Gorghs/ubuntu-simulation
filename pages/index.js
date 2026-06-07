import Ubuntu from "../components/ubuntu";
import ReactGA from 'react-ga4';
import Meta from "../components/SEO/Meta";

const TRACKING_ID = process.env.NEXT_PUBLIC_TRACKING_ID || "G-0000000000";
ReactGA.initialize(TRACKING_ID, { testMode: !process.env.NEXT_PUBLIC_TRACKING_ID });

function App() {
  const hiddenSeoStyle = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0'
  };

  return (
    <>
      <Meta />
      <h1 style={hiddenSeoStyle}>Karthick V Portfolio | Ubuntu Simulation | Minecraft Styled Portfolio</h1>
      <main style={hiddenSeoStyle}>
        <h2>Karthick V Personal Developer Portfolio</h2>
        <p>
          Welcome to the official Karthick V Portfolio (Gorghs). This is an interactive web-based Ubuntu simulation and Minecraft styled portfolio showcasing software engineering, Python systems development, workflow automation, and agentic AI.
        </p>
        <h2>Interactive Ubuntu Simulation &amp; OS Environment</h2>
        <p>
          This website simulates a functional Ubuntu Linux desktop operating system interface. Visitors can open applications such as a fully integrated Terminal with custom CLI commands, a VS Code iframe, Spotify music player, Settings panel, and contact forms. It provides a unique interactive simulation of the Ubuntu OS (also known as a ubutu simulation).
        </p>
        <h2>Minecraft Styled Portfolio Themes &amp; Design</h2>
        <p>
          Experience a premium Minecraft styled portfolio integrating custom Minecraft game graphics, custom-made pixel-art icons, and a scroll-driven Droste-effect zoom animation entering a dark cabin doorway.
        </p>
        <h2>Python and Agentic AI Systems Developer</h2>
        <p>
          Karthick V is an SDE specializing in building Python backend servers, API databases, and agentic AI systems utilizing LLMs and structured workflow pipelines.
        </p>
      </main>
      <Ubuntu />
    </>
  )
}

export default App;

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
      <h1 style={hiddenSeoStyle}>Karthick V — Software Development Engineer | Portfolio</h1>
      <main style={hiddenSeoStyle}>
        <h2>Karthick V Personal Developer Portfolio</h2>
        <p>
          Welcome to the official Karthick V Portfolio (Gorghs). This is an interactive portfolio showcasing software engineering, Python backend development, workflow automation, agentic AI systems, and browser extensions.
        </p>
        <h2>Featured Projects</h2>
        <p>
          Sherlock — A job aggregation engine searching multiple sources with API, CLI, GraphQL, and MCP integrations. EARTHIFY — YOLO-based waste classification with live camera detection. Project Steve — FastAPI workflow automation with n8n integration.
        </p>
        <h2>Browser Extensions</h2>
        <p>
          Inspect Locker — Firefox extension for element inspection. DraftBlaster — Content drafting tool. Water Reminder — Offline hydration reminder for Chromium browsers.
        </p>
      </main>
      <Ubuntu />
    </>
  )
}

export default App;

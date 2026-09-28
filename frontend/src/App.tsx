import { useEffect, useRef } from 'react';
import { AccessPanel } from './AccessPanel.tsx';
import { Link, NavLink, Navigate, Route, Routes, useLocation, useParams } from 'react-router';

function Page({ title, description, list }: { title: string; description: string; list?: string }) {
  const heading = useRef<HTMLHeadingElement>(null);
  const location = useLocation();
  const { workflowId, runId } = useParams();
  const id = workflowId ?? runId;
  useEffect(() => {
    document.title = `${title} — Relay`;
    const frame = requestAnimationFrame(() => heading.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, title]);
  return <>
    <div className="page-heading"><p className="eyebrow">Workflow console</p>
      <h1 ref={heading} tabIndex={-1}>{title}</h1><p>{description}</p>
    </div>
    <section className="placeholder" aria-label={`${title} availability`}>
      <span className="placeholder-mark" aria-hidden="true">↗</span>
      <div><h2>{title === 'Page not found' ? 'This page does not exist' : 'This view is not connected yet'}</h2>
        <p>{title === 'Page not found' ? 'Use the navigation to return to the console.' : 'The console foundation is ready. Workflow data and actions will appear here when the API and this view are implemented.'}</p>
        {id && <p className="resource-id">Requested ID: <code>{id}</code></p>}
        {list && <Link to={list}>Back to {workflowId ? 'workflows' : 'runs'}</Link>}
        {title === 'Page not found' && <Link to="/console/workflows">Go to Workflows</Link>}
      </div>
    </section>
  </>;
}

export function App() {
  return <div className="app">
    <a className="skip-link" href="#content">Skip to content</a>
    <header><Link className="brand" to="/console/workflows" aria-label="Relay home"><span aria-hidden="true">R</span>Relay</Link>
      <nav aria-label="Primary">
        <NavLink to="/console/workflows">Workflows</NavLink>
        <NavLink to="/console/runs">Runs</NavLink>
        <NavLink to="/console/approvals">Approvals</NavLink>
      </nav><span className="environment">Local development</span>
    </header>
    <main id="content" tabIndex={-1}>
      <AccessPanel />
      <Routes>
        <Route path="/" element={<Navigate to="/console/workflows" replace />} />
        <Route path="/console" element={<Navigate to="/console/workflows" replace />} />
        <Route path="/console/workflows" element={<Page title="Workflows" description="Inspect workflow definitions and their publication state." />} />
        <Route path="/console/workflows/:workflowId" element={<Page title="Workflow detail" description="Review a workflow definition and its run history." list="/console/workflows" />} />
        <Route path="/console/runs" element={<Page title="Runs" description="Follow workflow runs and inspect their execution traces." />} />
        <Route path="/console/runs/:runId" element={<Page title="Run detail" description="Inspect the steps and recorded outcomes of a run." list="/console/runs" />} />
        <Route path="/console/approvals" element={<Page title="Approvals" description="Review requests that need a human decision." />} />
        <Route path="*" element={<Page title="Page not found" description="The requested console address is unavailable." />} />
      </Routes>
    </main>
    <footer>Relay <span aria-hidden="true">·</span> Workflow orchestration</footer>
  </div>;
}

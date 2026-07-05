import React, { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import InputPage from './components/pages/InputPage';
import TechniquesPage from './components/pages/TechniquesPage';
import ResultPage from './components/pages/ResultPage';
import ComparePage from './components/pages/ComparePage';
import OutputPage from './components/pages/OutputPage';
import { colors, font } from './components/ui/tokens';

const STEPS = [
  { id: 'input', label: '01 Paste' },
  { id: 'techniques', label: '02 Select' },
  { id: 'result', label: '03 Craft' },
  { id: 'compare', label: '04 Compare' },
  { id: 'output', label: '05 Export' }
];

function ProgressStepper({ currentId }) {
  const currentIndex = STEPS.findIndex(s => s.id === currentId);
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 0', gap: '8px' }}>
      {STEPS.map((step, idx) => {
        const isActive = idx === currentIndex;
        const isPast = idx < currentIndex;
        return (
          <React.Fragment key={step.id}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              opacity: isActive || isPast ? 1 : 0.4,
              transition: 'opacity 0.3s ease'
            }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', fontWeight: '600',
                backgroundColor: isActive ? colors.primary : (isPast ? colors.green : colors.surfaceAlt),
                color: isActive || isPast ? '#FFF' : colors.textMuted,
              }}>
                {isPast ? '✓' : idx + 1}
              </div>
              <span style={{ fontSize: '13px', fontWeight: isActive ? '600' : '400', color: isActive ? colors.primaryLight : colors.text }}>
                {step.label.split(' ')[1]}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div style={{ width: '40px', height: '1px', backgroundColor: isPast ? colors.green : colors.surfaceAlt }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function Navbar() {
  const { reset } = useAppStore();
  return (
    <nav style={{ padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${colors.surfaceAlt}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={reset}>
        <span style={{ fontSize: '24px' }}>✦</span>
        <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '700', letterSpacing: '0.5px' }}>PromptCraft</h1>
      </div>
    </nav>
  );
}

function PageRouter() {
  const page = useAppStore(state => state.page);
  switch (page) {
    case 'input': return <InputPage />;
    case 'techniques': return <TechniquesPage />;
    case 'result': return <ResultPage />;
    case 'compare': return <ComparePage />;
    case 'output': return <OutputPage />;
    default: return <InputPage />;
  }
}

export default function App() {
  const { page, theme } = useAppStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    // Add global keyframes via JS
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.6; } 100% { opacity: 1; } }
      .fade-in { animation: fadeIn 0.4s ease forwards; }
      
      .responsive-grid-main {
        display: grid;
        grid-template-columns: 1fr 350px;
        gap: 24px;
        align-items: start;
      }
      .responsive-steps {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 16px;
        margin-top: 24px;
      }
      .responsive-summary-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
      }
      .responsive-diff-view {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
        align-items: start;
      }
      .responsive-output-main {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 24px;
        align-items: start;
      }
      
      @media (max-width: 900px) {
        .responsive-grid-main, .responsive-diff-view, .responsive-output-main {
          grid-template-columns: 1fr;
        }
        .responsive-summary-stats {
          grid-template-columns: 1fr;
        }
        .responsive-steps {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: font.sans }}>
      <Navbar />
      <main style={{ flex: 1, padding: '32px 5%', width: '100%' }}>
        <ProgressStepper currentId={page} />
        <div className="fade-in" key={page}>
          <PageRouter />
        </div>
      </main>
      <footer style={{ padding: '32px', textAlign: 'center', color: colors.textFaint, fontSize: '14px', borderTop: `1px solid ${colors.surfaceAlt}`, lineHeight: '1.6' }}>
        <p style={{ margin: '0 0 8px 0' }}>PromptCraft — Built on transformer attention research so you don't have to read it.</p>
        <p style={{ margin: '0 0 12px 0' }}>All AI processing via Groq API · No data stored anywhere · Page refresh clears everything</p>
        <p style={{ margin: 0, color: colors.textMuted }}>
          Forged with ❤️ by <a href="https://www.linkedin.com/in/piyushpatole7/" target="_blank" rel="noreferrer" style={{ color: colors.primary, textDecoration: 'none', fontWeight: '600' }}>Piyush</a> — <a href="https://www.linkedin.com/in/piyushpatole7/" target="_blank" rel="noreferrer" style={{ color: colors.primaryLight, textDecoration: 'none', fontWeight: '600' }}>If you love AI as much as I do, let's connect! 🚀</a>
        </p>
      </footer>
    </div>
  );
}

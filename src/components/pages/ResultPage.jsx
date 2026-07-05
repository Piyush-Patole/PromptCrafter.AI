import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { colors, tokens, badge, tag, font, alpha } from '../ui/tokens';

export default function ResultPage() {
  const { result, rawPrompt, setPage } = useAppStore();
  const [copied, setCopied] = useState(false);

  if (!result) {
    return <div style={{ color: colors.red }}>No result found. Please go back and try again.</div>;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result.crafted_prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSeverityColor = (sev) => {
    if (sev === 'high') return colors.red;
    if (sev === 'medium') return colors.amber;
    return colors.green;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h2 style={{ margin: 0, fontSize: '24px' }}>Crafted Result</h2>
          <span style={badge(colors.green)}>{result.use_case_tag}</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={tokens.btn.ghost} onClick={() => setPage('compare')}>Compare Metrics</button>
          <button style={tokens.btn.primary} onClick={() => setPage('output')}>Generate Doc →</button>
        </div>
      </div>

      <div className="responsive-grid-main">
        
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Crafted Prompt */}
          <div style={tokens.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={tokens.label}>Engineered Prompt</span>
              <button style={tokens.btn.sm} onClick={handleCopy}>
                {copied ? '✓ Copied!' : 'Copy to Clipboard'}
              </button>
            </div>
            <div style={{ ...tokens.codeBlock, minHeight: '300px', borderColor: colors.green }}>
              {result.crafted_prompt}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px', gap: '16px', fontSize: '12px', color: colors.textFaint }}>
              <span>Chars: {result.crafted_prompt.length}</span>
              <span>Est. Tokens: {Math.ceil(result.crafted_prompt.length / 4)}</span>
            </div>
            <div style={{ marginTop: '24px', padding: '16px', backgroundColor: alpha(colors.primary, 10), borderRadius: '8px', border: `1px solid ${alpha(colors.primary, 20)}`, textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '15px', color: colors.text }}>
                🔥 Just saved you hours of AI hallucinations? Let's geek out over Prompt Engineering! 
                <a href="https://www.linkedin.com/in/piyushpatole7/" target="_blank" rel="noreferrer" style={{ marginLeft: '6px', color: colors.primary, textDecoration: 'none', fontWeight: '700' }}>Connect with me on LinkedIn →</a>
              </p>
            </div>
          </div>

          {/* Quick Preview */}
          <div style={tokens.card}>
            <h3 style={{ ...tokens.label, marginBottom: '16px' }}>Quick Comparison</h3>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1, padding: '12px', borderRadius: '8px', border: `1px solid ${alpha(colors.red, 40)}`, backgroundColor: alpha(colors.red, 10), color: colors.red, fontSize: '13px', fontFamily: font.mono }}>
                {rawPrompt.slice(0, 150)}{rawPrompt.length > 150 ? '...' : ''}
              </div>
              <div style={{ flex: 1, padding: '12px', borderRadius: '8px', border: `1px solid ${alpha(colors.green, 40)}`, backgroundColor: alpha(colors.green, 10), color: colors.green, fontSize: '13px', fontFamily: font.mono }}>
                {result.crafted_prompt.slice(0, 150)}{result.crafted_prompt.length > 150 ? '...' : ''}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Issues Found */}
          <div style={{ ...tokens.card, padding: '16px' }}>
            <h3 style={{ ...tokens.label, marginBottom: '16px' }}>Issues Found ({result.original_issues.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {result.original_issues.map((iss, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: colors.text }}>{iss.issue}</span>
                    <span style={tag(getSeverityColor(iss.severity))}>{iss.severity}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted }}>{iss.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Techniques Applied */}
          <div style={{ ...tokens.card, padding: '16px' }}>
            <h3 style={{ ...tokens.label, marginBottom: '16px' }}>Techniques Applied ({result.techniques_applied.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {result.techniques_applied.map((t, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingBottom: '12px', borderBottom: i < result.techniques_applied.length - 1 ? `1px solid ${colors.surfaceAlt}` : 'none' }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: colors.primaryLight }}>{t.technique}</span>
                  <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted }}>{t.how_applied}</p>
                  <div style={{ marginTop: '4px' }}><span style={{ ...tag(colors.green), fontSize: '10px' }}>{t.impact}</span></div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

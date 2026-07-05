import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { colors, tokens, badge, font, alpha } from '../ui/tokens';

function ScoreBar({ label, beforeScore, afterScore }) {
  const [fillBefore, setFillBefore] = useState(0);
  const [fillAfter, setFillAfter] = useState(0);
  
  useEffect(() => {
    const t1 = setTimeout(() => setFillBefore(beforeScore), 100);
    const t2 = setTimeout(() => setFillAfter(afterScore), 450);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [beforeScore, afterScore]);

  const delta = afterScore - beforeScore;
  const isPositive = delta >= 0;

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontSize: '14px', fontWeight: '600' }}>{label}</span>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: colors.textMuted }}>{beforeScore} → <strong style={{ color: colors.text }}>{afterScore}</strong></span>
          <span style={{ ...badge(isPositive ? colors.green : colors.red), fontSize: '10px' }}>
            {isPositive ? '+' : ''}{delta}
          </span>
        </div>
      </div>
      
      <div style={{ height: '8px', backgroundColor: colors.surfaceAlt, borderRadius: '4px', overflow: 'hidden', position: 'relative' }}>
        {/* Before Bar (Red) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0,
          width: `${fillBefore}%`,
          backgroundColor: colors.red,
          transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)',
          opacity: 0.5
        }} />
        {/* After Bar (Indigo Gradient) */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0,
          width: `${fillAfter}%`,
          background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
          transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
    </div>
  );
}

export default function ComparePage() {
  const { result, rawPrompt, setPage } = useAppStore();

  if (!result) {
    return <div style={{ color: colors.red }}>No result found. Please go back and try again.</div>;
  }

  const comp = result.comparison;
  const overallBefore = Math.round((comp.clarity_before + comp.specificity_before + comp.structure_before) / 3);
  const overallAfter = Math.round((comp.clarity_after + comp.specificity_after + comp.structure_after) / 3);
  const overallDelta = overallAfter - overallBefore;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>Quality Comparison</h2>
          <p style={{ margin: 0, color: colors.textMuted, fontSize: '14px' }}>
            Mathematical evaluation of prompt structure before vs after.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={tokens.btn.ghost} onClick={() => setPage('result')}>← Back</button>
          <button style={tokens.btn.primary} onClick={() => setPage('output')}>Generate Doc →</button>
        </div>
      </div>

      {/* Summary Stats Row */}
      <div className="responsive-summary-stats">
        <div style={{ ...tokens.card, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '16px' }}>
          <span style={tokens.label}>Overall Quality</span>
          <div style={{ fontSize: '32px', fontWeight: '800', marginTop: '8px' }}>
            {overallAfter}<span style={{ fontSize: '16px', color: colors.textMuted }}>/100</span>
          </div>
          <div style={{ color: colors.green, fontSize: '13px', fontWeight: '600', marginTop: '4px' }}>+{overallDelta} points</div>
        </div>
        <div style={{ ...tokens.card, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '16px' }}>
          <span style={tokens.label}>Token Efficiency Gain</span>
          <div style={{ fontSize: '32px', fontWeight: '800', marginTop: '8px', color: colors.primaryLight }}>
            {comp.token_efficiency_gain_pct}%
          </div>
          <div style={{ color: colors.textMuted, fontSize: '13px', marginTop: '4px' }}>Less reasoning overhead</div>
        </div>
        <div style={{ ...tokens.card, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '16px' }}>
          <span style={tokens.label}>Issues Fixed</span>
          <div style={{ fontSize: '32px', fontWeight: '800', marginTop: '8px', color: colors.cyan }}>
            {result.original_issues.length}
          </div>
          <div style={{ color: colors.textMuted, fontSize: '13px', marginTop: '4px' }}>Architectural flaws resolved</div>
        </div>
      </div>

      <div className="responsive-diff-view">
        {/* Left Col: Scores & Improvements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={tokens.card}>
            <ScoreBar label="Clarity (Intent definition)" beforeScore={comp.clarity_before} afterScore={comp.clarity_after} />
            <ScoreBar label="Specificity (Boundaries & Constraints)" beforeScore={comp.specificity_before} afterScore={comp.specificity_after} />
            <ScoreBar label="Structure (Parseability & Syntax)" beforeScore={comp.structure_before} afterScore={comp.structure_after} />
            
            <div style={{ marginTop: '24px', padding: '16px', backgroundColor: colors.surfaceAlt, borderRadius: '8px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px' }}>Why These Metrics Matter</h4>
              <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: colors.textMuted, lineHeight: '1.5' }}>
                <strong style={{ color: colors.text }}>Clarity</strong> prevents broad semantic activation, reducing hallucinations.
              </p>
              <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: colors.textMuted, lineHeight: '1.5' }}>
                <strong style={{ color: colors.text }}>Specificity</strong> creates mathematical evaluation triggers for the model.
              </p>
              <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted, lineHeight: '1.5' }}>
                <strong style={{ color: colors.text }}>Structure</strong> isolates instructions from data, preventing confusion.
              </p>
            </div>
          </div>

          <div style={tokens.card}>
            <h3 style={{ ...tokens.label, marginBottom: '16px' }}>Key Improvements</h3>
            <ol style={{ margin: 0, paddingLeft: '16px', color: colors.text, fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {comp.key_improvements.map((imp, i) => (
                <li key={i} style={{ lineHeight: '1.5' }}>{imp}</li>
              ))}
            </ol>
          </div>

          <div style={{ padding: '16px', backgroundColor: alpha(colors.primary, 10), borderRadius: '8px', border: `1px solid ${alpha(colors.primary, 20)}`, textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '14px', color: colors.text }}>
              ✨ From zero-shot to hero-shot! If you're nerding out over this transformation, let's be friends.
              <a href="https://www.linkedin.com/in/piyushpatole7/" target="_blank" rel="noreferrer" style={{ display: 'block', marginTop: '8px', color: colors.primary, textDecoration: 'none', fontWeight: '700' }}>Connect with me on LinkedIn →</a>
            </p>
          </div>
        </div>

        {/* Right Col: Diff View */}
        <div style={{ ...tokens.card, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 style={{ ...tokens.label, marginBottom: '8px', color: colors.red }}>Before (Raw Prompt)</h3>
            <div style={{ 
              backgroundColor: alpha(colors.red, 10), border: `1px solid ${alpha(colors.red, 40)}`, 
              borderRadius: '8px', padding: '12px', color: colors.red, 
              fontFamily: font.mono, fontSize: '13px', maxHeight: '180px', overflowY: 'auto', whiteSpace: 'pre-wrap'
            }}>
              {rawPrompt}
            </div>
          </div>
          <div>
            <h3 style={{ ...tokens.label, marginBottom: '8px', color: colors.green }}>After (Engineered Prompt)</h3>
            <div style={{ 
              backgroundColor: alpha(colors.green, 10), border: `1px solid ${alpha(colors.green, 40)}`, 
              borderRadius: '8px', padding: '12px', color: colors.green, 
              fontFamily: font.mono, fontSize: '13px', maxHeight: '260px', overflowY: 'auto', whiteSpace: 'pre-wrap'
            }}>
              {result.crafted_prompt}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

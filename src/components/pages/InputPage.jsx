import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { colors, tokens, font, badge } from '../ui/tokens';

export default function InputPage() {
  const { rawPrompt, setRawPrompt, setPage } = useAppStore();

  const handleNext = () => {
    if (rawPrompt.trim().length > 0) {
      setPage('techniques');
    }
  };

  const EXAMPLES = [
    "Write something about productivity",
    "Help me code a login page",
    "Make a social media post about our new product",
    "Summarize this article for me",
    "Explain machine learning to me"
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <h1 style={{ 
          fontSize: '48px', fontWeight: '800', letterSpacing: '-1px', margin: '0 0 16px 0',
          background: `linear-gradient(135deg, ${colors.primaryLight} 0%, #FFF 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>
          AI-Powered Prompt Engineering
        </h1>
        <p style={{ fontSize: '18px', color: colors.textMuted, maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Transform any raw, vague, or broken prompt into a precision-engineered instruction using 12 research-backed techniques.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '24px' }}>
          <span style={badge(colors.primary)}>12 Techniques</span>
          <span style={badge(colors.amber)}>7.6% Token Overhead (CoD)</span>
          <span style={badge(colors.green)}>99% Accuracy on SCAN (LtM)</span>
        </div>
      </div>

      {/* Input Area */}
      <div style={tokens.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <label style={tokens.label}>Your Raw Prompt</label>
          <span style={{ fontSize: '12px', color: rawPrompt.length < 20 && rawPrompt.length > 0 ? colors.amber : colors.textFaint }}>
            {rawPrompt.length} characters
          </span>
        </div>
        <textarea
          style={{ ...tokens.textarea, minHeight: '180px', borderColor: rawPrompt ? colors.borderHover : colors.border }}
          placeholder="Paste your raw, messy, or vague prompt here..."
          value={rawPrompt}
          onChange={(e) => setRawPrompt(e.target.value)}
        />
        
        <div style={{ marginTop: '16px' }}>
          <p style={{ fontSize: '12px', color: colors.textMuted, marginBottom: '8px' }}>Or try an example:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {EXAMPLES.map((ex, i) => (
              <button 
                key={i} 
                onClick={() => setRawPrompt(ex)}
                style={{
                  ...tokens.btn.sm, 
                  color: colors.textMuted, 
                  borderColor: colors.border,
                  backgroundColor: rawPrompt === ex ? colors.surfaceAlt : 'transparent'
                }}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
          <button 
            style={{ ...tokens.btn.primary, opacity: rawPrompt.trim() ? 1 : 0.5 }}
            onClick={handleNext}
            disabled={!rawPrompt.trim()}
          >
            Next: Choose Techniques →
          </button>
        </div>
      </div>
      
      {/* How it works */}
      <div className="responsive-steps">
        {['01 Paste', '02 Select', '03 Craft', '04 Compare', '05 Export'].map((step, idx) => (
          <div key={idx} style={{ textAlign: 'center', color: colors.textMuted }}>
            <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>{step}</div>
            <div style={{ height: '2px', background: colors.surfaceAlt, width: '100%' }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

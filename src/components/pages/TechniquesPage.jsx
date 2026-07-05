import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { colors, tokens, badge, alpha } from '../ui/tokens';
import Tooltip from '../ui/Tooltip';
import { TECHNIQUES, TECHNIQUE_CATEGORIES } from '../../data/techniques';
import { callGroq } from '../../api/groqClient';
import { buildCraftPrompt as buildPromptFn } from '../../api/promptBuilders';

export default function TechniquesPage() {
  const { rawPrompt, selectedIds, toggleTechnique, selectAll, clearSelection, setPage, setResult, setLoading, loading, loadingMsg, setError } = useAppStore();

  const handleCraft = async () => {
    setLoading(true, `Applying ${selectedIds.length} technique(s) via Groq...`);
    setError('');
    try {
      const messages = buildPromptFn(rawPrompt, selectedIds);
      const data = await callGroq(messages);
      setResult(data);
      setPage('result');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const allIds = TECHNIQUES.map(t => t.id);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px', gap: '16px' }}>
        <div style={{ width: '40px', height: '40px', border: `3px solid ${colors.border}`, borderTopColor: colors.primary, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: colors.textMuted }}>{loadingMsg}</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>Select Techniques</h2>
          <p style={{ margin: 0, color: colors.textMuted, fontSize: '14px' }}>
            Choose which engineering techniques to apply to your prompt.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={tokens.btn.sm} onClick={() => selectAll(allIds)}>Select All (12)</button>
          <button style={{ ...tokens.btn.sm, color: colors.textMuted }} onClick={clearSelection}>Clear</button>
        </div>
      </div>

      {TECHNIQUE_CATEGORIES.map(category => {
        const categoryTechs = TECHNIQUES.filter(t => t.category === category);
        if (categoryTechs.length === 0) return null;
        return (
          <div key={category} style={{ marginBottom: '8px' }}>
            <h3 style={{ ...tokens.label, marginBottom: '12px', borderBottom: `1px solid ${colors.surfaceAlt}`, paddingBottom: '8px' }}>
              {category}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {categoryTechs.map(tech => {
                const isSelected = selectedIds.includes(tech.id);
                
                const TooltipContent = (
                  <div style={{ fontSize: '13px', lineHeight: '1.5' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <strong style={{ color: tech.color }}>{tech.name}</strong>
                      <span style={{ ...badge(tech.color), fontSize: '9px' }}>{tech.badge}</span>
                    </div>
                    <p style={{ color: colors.text, marginBottom: '12px' }}>{tech.fullDesc}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '4px', color: colors.textMuted }}>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase' }}>Significance:</span>
                      <span>{tech.significance}</span>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase' }}>Effect:</span>
                      <span style={{ color: colors.green }}>{tech.effect}</span>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase' }}>Trade-off:</span>
                      <span style={{ color: colors.amber }}>{tech.tradeoff}</span>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase' }}>Source:</span>
                      <span style={{ color: colors.primaryLight }}>{tech.researchSource}</span>
                    </div>
                  </div>
                );

                return (
                  <Tooltip key={tech.id} content={TooltipContent} width={340}>
                    <div 
                      onClick={() => toggleTechnique(tech.id)}
                      style={{
                        ...tokens.card,
                        padding: '16px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        border: isSelected ? `1px solid ${tech.color}` : `1px solid ${colors.border}`,
                        backgroundColor: isSelected ? alpha(tech.color, 10) : colors.surface,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '18px' }}>{tech.icon}</span>
                          <span style={{ fontWeight: '600', fontSize: '15px', color: isSelected ? tech.color : colors.text }}>{tech.name}</span>
                        </div>
                        <div style={{ 
                          width: '18px', height: '18px', borderRadius: '50%', 
                          border: `2px solid ${isSelected ? tech.color : colors.borderHover}`,
                          backgroundColor: isSelected ? tech.color : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          {isSelected && <span style={{ color: '#FFF', fontSize: '10px' }}>✓</span>}
                        </div>
                      </div>
                      <p style={{ margin: 0, fontSize: '13px', color: colors.textMuted }}>{tech.shortDesc}</p>
                      <div style={{ fontSize: '10px', color: colors.textFaint, textTransform: 'uppercase', marginTop: '4px' }}>
                        Hover for research details
                      </div>
                    </div>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        );
      })}

      <div style={{ ...tokens.card, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', bottom: '24px', zIndex: 10, backgroundColor: alpha(colors.surface, 90), backdropFilter: 'blur(8px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={tokens.label}>Preview</span>
          <span style={{ fontSize: '13px', color: colors.textMuted, maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            "{rawPrompt.slice(0, 55)}{rawPrompt.length > 55 ? '...' : ''}"
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '14px', color: colors.textMuted }}>{selectedIds.length} selected</span>
          <button style={tokens.btn.ghost} onClick={() => setPage('input')}>Back</button>
          <button style={tokens.btn.primary} onClick={handleCraft}>🚀 Craft My Prompt</button>
        </div>
      </div>
    </div>
  );
}

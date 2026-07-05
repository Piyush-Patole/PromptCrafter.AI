import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { colors, tokens, font, alpha } from '../ui/tokens';
import { DOC_PROMPT_MAP } from '../../api/promptBuilders';
import { callGroq } from '../../api/groqClient';

const DOC_TYPES = [
  { id: 'readme', icon: '📄', label: 'README.md', desc: 'Standard project docs', hint: 'Add: project name, tech stack, target audience' },
  { id: 'script', icon: '🎬', label: 'Video Script', desc: 'YouTube or TikTok', hint: 'Add: channel name, target length, tone' },
  { id: 'sop', icon: '📋', label: 'SOP Document', desc: 'Standard Ops Proc', hint: 'Add: department, tool names, compliance reqs' },
  { id: 'email', icon: '📧', label: 'Professional Email', desc: 'Executive comms', hint: 'Add: recipient role, relationship, desired outcome' },
  { id: 'blog', icon: '📝', label: 'Blog Post', desc: 'SEO optimized article', hint: 'Add: target reader, publication, SEO keyword' }
];

export default function OutputPage() {
  const { result, docType, setDocType, docContext, setDocContext, docOutput, setDocOutput, docLoading, setDocLoading, error, setError, setPage, reset } = useAppStore();
  const [copied, setCopied] = useState(false);

  if (!result) {
    return <div style={{ color: colors.red }}>No result found. Please go back and try again.</div>;
  }

  const activeDocDef = DOC_TYPES.find(d => d.id === docType);

  const handleGenerate = async () => {
    setDocLoading(true);
    setError('');
    setDocOutput(null);
    try {
      const builderFn = DOC_PROMPT_MAP[docType];
      const messages = builderFn(result.crafted_prompt, docContext);
      const data = await callGroq(messages, 0.4, 3000); // Higher temp for creative docs
      setDocOutput(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setDocLoading(false);
    }
  };

  const handleCopy = () => {
    if (!docOutput) return;
    navigator.clipboard.writeText(docOutput.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!docOutput) return;
    const ext = ['readme', 'blog'].includes(docType) ? '.md' : '.txt';
    const filename = `${docOutput.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'document'}${ext}`;
    
    const blob = new Blob([docOutput.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>Export & Generate</h2>
          <p style={{ margin: 0, color: colors.textMuted, fontSize: '14px' }}>
            Use your engineered prompt to generate a production-ready document.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={tokens.btn.ghost} onClick={() => setPage('compare')}>← Back</button>
          <button style={{ ...tokens.btn.ghost, borderColor: colors.red, color: colors.red }} onClick={reset}>Start New Prompt</button>
        </div>
      </div>

      {/* Crafted Prompt Preview */}
      <div style={{ ...tokens.card, padding: '16px', position: 'relative', overflow: 'hidden' }}>
        <span style={{ ...tokens.label, marginBottom: '8px', display: 'block' }}>Using Engineeed Prompt</span>
        <div style={{ fontFamily: font.mono, fontSize: '12px', color: colors.cyan, opacity: 0.7, whiteSpace: 'pre-wrap', maxHeight: '60px' }}>
          {result.crafted_prompt}
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px', background: `linear-gradient(transparent, ${colors.surface})` }} />
      </div>

      <div className="responsive-output-main">
        
        {/* Left Col: Config */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={tokens.card}>
            <h3 style={{ ...tokens.label, marginBottom: '16px' }}>1. Select Document Type</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {DOC_TYPES.map(type => {
                const isActive = docType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setDocType(type.id)}
                    style={{
                      ...tokens.btn.secondary,
                      background: isActive ? alpha(colors.primary, 20) : 'transparent',
                      border: `1px solid ${isActive ? colors.primary : colors.border}`,
                      color: isActive ? colors.primary : colors.textMuted,
                      textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px'
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>{type.icon}</span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontWeight: '600', fontSize: '14px' }}>{type.label}</span>
                      <span style={{ fontSize: '12px', color: isActive ? colors.primaryLight : colors.textFaint }}>{type.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div style={tokens.card}>
            <h3 style={{ ...tokens.label, marginBottom: '8px' }}>2. Add Context (Optional)</h3>
            <p style={{ fontSize: '12px', color: colors.textMuted, marginBottom: '12px' }}>{activeDocDef.hint}</p>
            <textarea
              style={{ ...tokens.textarea, minHeight: '120px' }}
              placeholder="Enter additional facts, names, or requirements here..."
              value={docContext}
              onChange={e => setDocContext(e.target.value)}
            />
            
            {error && <div style={{ color: colors.red, fontSize: '12px', marginTop: '12px' }}>{error}</div>}
            
            <button 
              style={{ ...tokens.btn.primary, width: '100%', marginTop: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
              onClick={handleGenerate}
              disabled={docLoading}
            >
              {docLoading ? (
                <>
                  <div style={{ width: '14px', height: '14px', border: '2px solid #FFF', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  Generating...
                </>
              ) : 'Generate Document'}
            </button>
          </div>
        </div>

        {/* Right Col: Output */}
        <div style={{ ...tokens.card, minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
          {docOutput ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '20px' }}>{docOutput.title}</h3>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: colors.textFaint }}>
                    <span>Chars: {docOutput.content.length}</span>
                    <span>Tokens: {Math.ceil(docOutput.content.length / 4)}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={tokens.btn.sm} onClick={handleCopy}>
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                  <button style={{ ...tokens.btn.sm, borderColor: colors.primary, color: colors.primary }} onClick={handleDownload}>
                    Download
                  </button>
                </div>
              </div>
              <div style={{ ...tokens.codeBlock, flex: 1, color: colors.text, borderColor: colors.borderHover, overflowY: 'auto', maxHeight: '500px' }}>
                {docOutput.content}
              </div>
              <div style={{ marginTop: '24px', padding: '16px', backgroundColor: alpha(colors.primary, 10), borderRadius: '8px', border: `1px solid ${alpha(colors.primary, 20)}`, textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '15px', color: colors.text }}>
                  🚀 Shipping this new prompt? Let's build the future of AI together! 
                  <a href="https://www.linkedin.com/in/piyushpatole7/" target="_blank" rel="noreferrer" style={{ marginLeft: '6px', color: colors.primary, textDecoration: 'none', fontWeight: '700' }}>Connect with me on LinkedIn →</a>
                </p>
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: colors.textFaint, gap: '12px' }}>
              <span style={{ fontSize: '48px' }}>{activeDocDef.icon}</span>
              <p>Select a document type and click Generate.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

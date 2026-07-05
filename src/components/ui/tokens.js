export const colors = {
  bg:          'var(--color-bg)',
  surface:     'var(--color-surface)',
  surfaceAlt:  'var(--color-surface-alt)',
  border:      'var(--color-border)',
  borderHover: 'var(--color-border-hover)',
  primary:     'var(--color-primary)',
  primaryLight:'var(--color-primary-light)',
  text:        'var(--color-text)',
  textMuted:   'var(--color-text-muted)',
  textFaint:   'var(--color-text-faint)',
  green:       'var(--color-green)',
  red:         'var(--color-red)',
  amber:       'var(--color-amber)',
  cyan:        'var(--color-cyan)',
};

export const font = {
  sans: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", "Inter", sans-serif',
  mono: '"SF Mono", ui-monospace, "JetBrains Mono", monospace',
};

export const tokens = {
  card: {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 12px var(--color-shadow)',
  },
  label: {
    fontSize: '13px',
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: '0.1em',
    color: colors.textMuted,
  },
  textarea: {
    width: '100%',
    backgroundColor: colors.bg,
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    color: colors.text,
    fontFamily: font.mono,
    padding: '16px',
    fontSize: '16px',
    lineHeight: '1.6',
    resize: 'vertical',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  codeBlock: {
    backgroundColor: colors.bg,
    fontFamily: font.mono,
    color: colors.cyan,
    padding: '16px',
    borderRadius: '8px',
    border: `1px solid ${colors.border}`,
    whiteSpace: 'pre-wrap',
    fontSize: '15px',
    overflowX: 'auto',
  },
  btn: {
    primary: {
      background: `linear-gradient(135deg, ${colors.primary} 0%, #8B5CF6 100%)`,
      color: '#FFF',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '16px',
      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
      transition: 'opacity 0.2s',
    },
    ghost: {
      background: 'transparent',
      color: colors.primaryLight,
      border: `1px solid ${colors.borderHover}`,
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background 0.2s',
    },
    secondary: {
      background: colors.surfaceAlt,
      color: colors.textMuted,
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'background 0.2s',
    },
    sm: {
      background: 'transparent',
      color: colors.primaryLight,
      border: `1px solid ${colors.borderHover}`,
      padding: '6px 12px',
      borderRadius: '6px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '13px',
    }
  }
};

export const alpha = (color, percent) => `color-mix(in srgb, ${color} ${percent}%, transparent)`;

export const badge = (color) => ({
  display: 'inline-block',
  padding: '4px 8px',
  borderRadius: '4px',
  backgroundColor: alpha(color, 15),
  border: `1px solid ${alpha(color, 40)}`,
  color: color,
  fontSize: '11px',
  textTransform: 'uppercase',
  fontWeight: '700',
  letterSpacing: '0.05em',
});

export const tag = (color) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '2px 8px',
  borderRadius: '9999px',
  backgroundColor: alpha(color, 20),
  color: color,
  fontSize: '13px',
  fontWeight: '500',
});

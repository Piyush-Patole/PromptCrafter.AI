import { create } from 'zustand';

const initialState = {
  theme: 'dark',
  page: 'input',
  rawPrompt: '',
  selectedIds: [],
  result: null,
  loading: false,
  loadingMsg: '',
  error: '',
  docType: 'readme',
  docContext: '',
  docOutput: null,
  docLoading: false,
};

export const useAppStore = create((set) => ({
  ...initialState,
  
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setPage: (page) => set({ page }),
  
  setRawPrompt: (text) => set({ rawPrompt: text }),
  
  toggleTechnique: (id) => set((state) => {
    if (state.selectedIds.includes(id)) {
      return { selectedIds: state.selectedIds.filter(x => x !== id) };
    } else {
      return { selectedIds: [...state.selectedIds, id] };
    }
  }),
  
  selectAll: (allIds) => set({ selectedIds: allIds }),
  
  clearSelection: () => set({ selectedIds: [] }),
  
  setResult: (result) => set({ result }),
  
  setLoading: (loading, msg = '') => set({ loading, loadingMsg: msg }),
  
  setError: (msg) => set({ error: msg }),
  
  clearError: () => set({ error: '' }),
  
  setDocType: (type) => set({ docType: type }),
  
  setDocContext: (text) => set({ docContext: text }),
  
  setDocOutput: (output) => set({ docOutput: output }),
  
  setDocLoading: (loading) => set({ docLoading: loading }),
  
  reset: () => set(initialState),
}));

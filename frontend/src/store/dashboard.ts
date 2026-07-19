import { create } from 'zustand';
import { IContent, IReport } from '@contentpulse/shared';

interface DashboardStore {
  contents: IContent[];
  setContents: (contents: IContent[]) => void;
  
  reports: IReport[];
  setReports: (reports: IReport[]) => void;
  
  selectedReport: IReport | null;
  setSelectedReport: (report: IReport | null) => void;

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  error: string | null;
  setError: (error: string | null) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  contents: [],
  setContents: (contents) => set({ contents }),
  
  reports: [],
  setReports: (reports) => set({ reports }),
  
  selectedReport: null,
  setSelectedReport: (report) => set({ selectedReport: report }),

  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  error: null,
  setError: (error) => set({ error }),
}));

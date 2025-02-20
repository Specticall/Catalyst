import { create } from "zustand";

type CookieEditorState = {
  selectedId?: number;
  activeDomain?: string;
  temporaryDomainName?: string;
  setSelectedId: (id?: number) => void;
  selectCookie: (domain: string, id?: number) => void;
  setActiveDomain: (domain?: string) => void;
  addTemporaryDomainName: (domainName: string) => void;
  focusFirstInput: () => void;
};

const useCookieEditor = create<CookieEditorState>((set, get) => ({
  selectedId: undefined,
  activeDomain: undefined,
  temporaryDomainName: undefined,
  setSelectedId: (id) => set((cur) => ({ ...cur, selectedId: id })),
  setActiveDomain: (domain) => set((cur) => ({ ...cur, activeDomain: domain })),
  selectCookie: (domain, id) => {
    set((cur) => ({ ...cur, activeDomain: domain, selectedId: id }));
    get().focusFirstInput();
  },
  addTemporaryDomainName: (domainName) => {
    set((cur) => ({
      ...cur,
      temporaryDomainName: domainName,
      activeDomain: domainName,
      selectedId: undefined,
    }));
    get().focusFirstInput();
  },
  focusFirstInput: () => {
    const el = document.querySelector("[data-cookie-name-input]") as
      | HTMLInputElement
      | undefined;
    if (!el) return;
    el.focus();
  },
}));

export default useCookieEditor;

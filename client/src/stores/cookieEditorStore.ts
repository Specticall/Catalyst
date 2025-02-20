import { create } from "zustand";

type CookieEditorState = {
  selectedId?: number;
  activeDomain?: string;
  collectionId?: string;
  temporaryDomainName?: string;
  setSelectedId: (id?: number) => void;
  selectCookie: (domain: string, id?: number) => void;
  setActiveDomain: (domain?: string) => void;
  addTemporaryDomainName: (domainName: string) => void;
  focusFirstInput: () => void;
  setCollectionId: (id?: string) => void;
  reset: () => void;
};

const useCookieEditor = create<CookieEditorState>((set, get) => ({
  selectedId: undefined,
  activeDomain: undefined,
  temporaryDomainName: undefined,
  collectionId: undefined,
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
  setCollectionId: (id) => set((cur) => ({ ...cur, collectionId: id })),
  reset: () =>
    set((cur) => ({
      ...cur,
      selectedId: undefined,
      activeDomain: undefined,
      temporaryDomainName: undefined,
      collectionId: undefined,
    })),
}));

export default useCookieEditor;

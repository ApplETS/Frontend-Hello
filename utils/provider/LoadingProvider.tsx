"use client";

import {
  ReactNode,
  TransitionStartFunction,
  createContext,
  useContext,
  useTransition,
} from "react";

type Props = {
  children: ReactNode;
};

interface LoadingContextType {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export default function LoadingProvider({ children }: Props) {
  const [isLoading, startTransition] = useTransition();

  const loading = {
    isLoading,
    startTransition,
  };

  return (
    <LoadingContext.Provider value={loading}>{children}</LoadingContext.Provider>
  );
}

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

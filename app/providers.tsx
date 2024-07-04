'use client';

import {SingingProvider} from './context/sing';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Providers({ children }: Readonly<{children: React.ReactNode;}>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <SingingProvider>
        {children}
      </SingingProvider>
    </QueryClientProvider>
  );
}
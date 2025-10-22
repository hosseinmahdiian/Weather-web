import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ChildrenType } from "../types/types.type";

const ReactQueryProvider = ({ children }: ChildrenType) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import Projetos from "./modules/projetos";
import MassagistaDetalhe from "./modules/projetos/MassagistaDetalhe";
import Projetos2 from "./modules/projetos2/Projetos2";
import MassagistaDetalhe2 from "./modules/projetos2/MassagistaDetalhe2";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Projetos />} />
          <Route path="/massagista/:slug" element={<MassagistaDetalhe />} />
          <Route path="/v2" element={<Projetos2 />} />
          <Route path="/v2/massagista/:slug" element={<MassagistaDetalhe2 />} />
          {/* Catch-all v2: qualquer rota /v2/qualquer-coisa não mapeada → /v2 */}
          <Route path="/v2/*" element={<Navigate to="/v2" replace />} />
          <Route path="/advogada" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          {/* Catch-all global: qualquer outra rota não mapeada → home v1.
              Adicione novas rotas ACIMA desta linha à medida que forem criadas. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

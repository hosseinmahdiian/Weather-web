import Routers from "./routers/Router";
import "./locales/i18n.ts";
import { BrowserRouter } from "react-router-dom";
import ReactQueryProvider from "./providers/reactQueryProvider.tsx";
import { Toaster } from "react-hot-toast";
import { CustomThemeProvider } from "./context/ThemeContext.tsx";

function App() {
  
  return (
    <>
      <CustomThemeProvider>
        <BrowserRouter>
          <ReactQueryProvider>
            <Routers />
            <Toaster />
          </ReactQueryProvider>
        </BrowserRouter>
      </CustomThemeProvider>
    </>
  );
}

export default App;

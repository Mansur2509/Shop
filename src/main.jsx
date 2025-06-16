import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./root.css";
import { store } from "./store/store.js";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* <ThemeProvider>
      <LanguageProvider> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* </LanguageProvider>
    </ThemeProvider> */}
    </Provider>
  </StrictMode>
);

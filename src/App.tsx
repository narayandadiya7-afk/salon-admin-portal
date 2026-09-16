import React from "react";
import AppRoutes from "./data/app-routes";
import { LanguageProvider } from "./context/language-context";
import { Provider } from "react-redux";
import store from "./state/store";
import { AppProvider, UserProvider } from "./context";
import { ThemeProvider } from "./contexts/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <Provider store={store}>
            <AppProvider>
              <UserProvider>
                <AppRoutes></AppRoutes>
              </UserProvider>
            </AppProvider>
          </Provider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;

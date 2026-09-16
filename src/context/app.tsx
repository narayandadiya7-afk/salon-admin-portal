import React, { useState } from 'react';

// Type definition for the properties of the AppProvider component
type TProps = {
  children: React.ReactNode; // render children,
  value?: any;
};

// Type definition for the state of the AppProvider component
type TState = {
  value: {
    fetchLanguages: Function;
    getTranslatedById: Function;
    updateTranslation: Function;
  };
};

// Default value for the context
const DEFAULT_VALUE: any = {
  lang: {
    type: 'en',
    data: {},
  },
  theme: {
    name: 'Default App',
    color: {
      primaryColor: '#97C5C3',
      secondaryColor: '#00D6CC',
    },
  },
};

// Create a React context with default values
const AppContext = React.createContext<{
  getTranslatedById: Function;
  updateTranslation: Function;
  theme?: Object;
  fetchLanguages: Function;
}>({
  getTranslatedById: () => { },
  updateTranslation: () => { },
  fetchLanguages: () => { },
});

// AppProvider component that provides the context value to its children
export default function AppProvider(props: TProps) {
  // State hook to manage the state of the component
  const [state, setState] = useState<TState>({
    value: {
      ...DEFAULT_VALUE,
      fetchLanguages: () => { },
      getTranslatedById: () => { },
      updateTranslation: () => { },
    },
  });

  // Render the AppContext.Provider with the context value and children
  return (
    <AppContext.Provider value={state.value}>{props.children}</AppContext.Provider>
  );
}

// Export the AppContext and AppProvider for use in other components
export { AppContext, AppProvider };

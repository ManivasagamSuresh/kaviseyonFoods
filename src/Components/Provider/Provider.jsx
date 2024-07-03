"use client";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import { useEffect } from "react";

export default function Providers({ children }) {
  useEffect(() => {
    persistor.persist();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

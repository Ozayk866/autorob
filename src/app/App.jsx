import { RouterProvider } from "react-router/dom";
import { Providers } from "./providers";
import "./styles/tokens.css";
import "./styles/fonts.css";
import "./styles/globals.css";

export function App({ queryClient, router }) {
  return (
    <Providers queryClient={queryClient}>
      <RouterProvider router={router} />
    </Providers>
  );
}

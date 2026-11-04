import { useSearchParams } from "react-router";

/** const [soha, setSoha] = useCategoryParam(); — `?soha=` URL parametri (bo'sh → hammasi) */
export function useCategoryParam() {
  const [params, setParams] = useSearchParams();
  const soha = params.get("soha") ?? "";

  const setSoha = (value) =>
    setParams(
      (prev) => {
        if (value) prev.set("soha", value);
        else prev.delete("soha");
        return prev;
      },
      { replace: true, preventScrollReset: true },
    );

  return [soha, setSoha];
}

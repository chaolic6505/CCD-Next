import { useEffect } from "react";
import { useRouter } from "next/router";

export const useRouteChange = (callback: () => void) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      callback();
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, callback]);
};

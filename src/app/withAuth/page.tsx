import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (Component: any) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      // Verificar se estamos no lado do cliente
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
        }
      }
    }, [router]);

    return <Component {...props} />;
  };
};

export default withAuth;

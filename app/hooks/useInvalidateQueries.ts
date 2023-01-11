import { useQueryClient } from "@tanstack/react-query";

export default function useInvalidateQueries() {
  const queryClient = useQueryClient();

  function invalidate(queryKey: string | Array<string>) {
    if (typeof queryKey === "object") {
      queryKey.forEach((k) => {
        queryClient.invalidateQueries([k]);
      });
    } else {
      queryClient.invalidateQueries({
        queryKey: [queryKey],
      });
    }
  }

  return { invalidate };
}

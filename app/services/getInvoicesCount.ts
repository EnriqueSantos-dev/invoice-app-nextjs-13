import api from "../lib/axios";

type Response = {
  count: number;
};

export default async function getInvoicesCount(): Promise<Response> {
  const res = await api.get("/getInvoicesCount");
  return res.data;
}

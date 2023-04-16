import "next-auth";

declare module "next-auth" {
  export interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
    };
  }
}

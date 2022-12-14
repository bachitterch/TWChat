import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      image: string;
      email: string;
    };
    accessToken: string;
    accessTokenExpires: number;
  }
}

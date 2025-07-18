import { withAuth } from "next-auth/middleware";

export default withAuth();

export const config = {
  matcher: ["/profile", "/cart", "/checkout"],
  pages: {
    signIn: "/login",
  },
}; 
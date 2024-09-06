import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export default withAuth( {
    loginPage: "/",
    isReturnToCurrentPage: true,
})


export const config = {
    matcher: [
        "/invoices/:path*",
        "/customers/:path*",
        "/settings/:path*",
        "/collections/:path*",
    ],
}

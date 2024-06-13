// This one line applies next-auth to the entire project.
export { default } from "next-auth/middleware";

export const config = { matcher: ["/user/about", "/postFeeds"] }
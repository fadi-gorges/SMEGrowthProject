export const getUrl = () => {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL &&
      `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`) ||
    "http://localhost:3000"
  );
};

export interface PageProps {
  params: { slug: string; type?: string; id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export interface PageProps {
    params: { slug: string; type?: string };
    searchParams: { [key: string]: string | string[] | undefined };
}
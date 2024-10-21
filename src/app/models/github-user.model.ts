export interface GitHubUser {
    id: number;
    login: string;
    avatar_url: string;
    public_repos: number;
    name?: string;
    bio?: string;
    company?: string;
    location?: string;
    blog?: string;
}
  
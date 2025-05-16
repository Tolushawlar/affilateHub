export type BlogPost = {
    id: number;
    title: string;
    date: string;
    author: {
        name: string;
        image: string;
        bio: string;
    };
    content: string;
    categories: string[];
    tags: string[];
    readingTime: string;
    excerpt: string;
    featuredImage: string;
    affiliateLinks: {
        url: string;
        title: string;
        description: string;
        price: string;
        image: string;
    }[];
}
import type { UserModel } from "@/models/UserModel";

export const UserData: UserModel[] = [
  {
    userId: "user1",
    name: "Achmad Rizki",
    email: "rizky@gmail.com",
    password: "12345",
    projects: ["project1"],
    totalLikes: 20000,
    totalComments: 1000,
    totalProjects: 1,
    followers: ["user3"],
    following: ["user3"],
    profileImage: "ernest-flowers-3RPAycscpSc-unsplash.jpg",
    bio: "lorem ipsum dolor sit amet",
    location: "Jakarta, Indonesia",
    website: "https://polinema.ac.id",
    twitter: "https://polinema.ac.id",
    github: "https://polinema.ac.id",
    linkedin: "https://polinema.ac.id",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    userId: "user2",
    name: "Achmad Ramadhan",
    email: "ramadhan@gmail.com",
    password: "12345",
    projects: ["project2"],
    totalLikes: 20000,
    totalComments: 1000,
    totalProjects: 1,
    followers: ["user3"],
    following: ["user3"],
    profileImage: "ernest-flowers-3RPAycscpSc-unsplash.jpg",
    bio: "lorem ipsum dolor sit amet",
    location: "Jakarta, Indonesia",
    website: "https://polinema.ac.id",
    twitter: "https://polinema.ac.id",
    github: "https://polinema.ac.id",
    linkedin: "https://polinema.ac.id",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    userId: "user3",
    name: "Achmad Raihan",
    email: "raihan@gmail.com",
    password: "12345",
    projects: ["project3"],
    totalLikes: 20000,
    totalComments: 1000,
    totalProjects: 1,
    followers: ["user2"],
    following: ["user2"],
    profileImage: "ernest-flowers-3RPAycscpSc-unsplash.jpg",
    bio: "lorem ipsum dolor sit amet",
    location: "Jakarta, Indonesia",
    website: "https://polinema.ac.id",
    twitter: "https://polinema.ac.id",
    github: "https://polinema.ac.id",
    linkedin: "https://polinema.ac.id",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

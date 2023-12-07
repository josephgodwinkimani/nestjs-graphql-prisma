/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class NewPost {
    title: string;
    text: string;
    authorId: string;
}

export class UpdatePost {
    id: string;
    title: string;
    text: string;
    isPublished: boolean;
}

export class NewUser {
    name: string;
    email: string;
}

export class UpdateUser {
    id: string;
    name: string;
    email: string;
    path?: Nullable<string>;
}

export class Post {
    id: string;
    title: string;
    text: string;
    isPublished: boolean;
    author: User;
}

export abstract class IQuery {
    abstract posts(): Post[] | Promise<Post[]>;

    abstract post(id: string): Nullable<Post> | Promise<Nullable<Post>>;

    abstract users(): User[] | Promise<User[]>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createPost(input: NewPost): Post | Promise<Post>;

    abstract updatePost(input: UpdatePost): Post | Promise<Post>;

    abstract deletePost(id: string): Post | Promise<Post>;

    abstract createUser(input: NewUser): User | Promise<User>;

    abstract updateUser(input: UpdateUser): User | Promise<User>;

    abstract deleteUser(id: string): User | Promise<User>;
}

export abstract class ISubscription {
    abstract postCreated(): Nullable<Post> | Promise<Nullable<Post>>;

    abstract userCreated(): Nullable<User> | Promise<Nullable<User>>;

    abstract userUpdated(): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    id: string;
    name: string;
    email: string;
    posts: Post[];
    path?: Nullable<string>;
}

type Nullable<T> = T | null;

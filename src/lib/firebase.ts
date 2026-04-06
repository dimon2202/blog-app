import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  where,
  Timestamp,
} from "firebase/firestore";
import type { Post, Comment, PostFormData, CommentFormData } from "../types";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const toTimestamp = (ts: Timestamp | number): number =>
  ts instanceof Timestamp ? ts.toMillis() : ts;

export const postsRef = collection(db, "posts");

export const fetchPostsFromDB = async (): Promise<Post[]> => {
  const q = query(postsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Post, "id">),
    createdAt: toTimestamp(d.data().createdAt),
    updatedAt: toTimestamp(d.data().updatedAt),
  }));
};

export const fetchPostByIdFromDB = async (id: string): Promise<Post | null> => {
  const snap = await getDoc(doc(db, "posts", id));
  if (!snap.exists()) return null;
  const data = snap.data() as Omit<Post, "id">;
  return {
    id: snap.id,
    ...data,
    createdAt: toTimestamp(data.createdAt),
    updatedAt: toTimestamp(data.updatedAt),
  };
};

export const addPostToDB = async (data: PostFormData): Promise<Post> => {
  const now = Date.now();
  const ref = await addDoc(postsRef, {
    ...data,
    createdAt: now,
    updatedAt: now,
  });
  return { id: ref.id, ...data, createdAt: now, updatedAt: now };
};

export const updatePostInDB = async (
  id: string,
  data: Partial<PostFormData>,
): Promise<void> => {
  await updateDoc(doc(db, "posts", id), {
    ...data,
    updatedAt: Date.now(),
  });
};

export const deletePostFromDB = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, "posts", id));
};

export const commentsRef = collection(db, "comments");

export const fetchCommentsByPostId = async (
  postId: string,
): Promise<Comment[]> => {
  const q = query(
    commentsRef,
    where("postId", "==", postId),
    orderBy("createdAt", "asc"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Comment, "id">),
    createdAt: toTimestamp(d.data().createdAt),
  }));
};

export const addCommentToDB = async (
  data: CommentFormData,
): Promise<Comment> => {
  const now = Date.now();
  const ref = await addDoc(commentsRef, { ...data, createdAt: now });
  return { id: ref.id, ...data, createdAt: now };
};

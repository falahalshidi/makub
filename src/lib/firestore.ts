import {
    collection,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    getDocs,
    Timestamp,
    addDoc,
    QueryConstraint,
} from "firebase/firestore";
import { db } from "./firebase";

// ===== Type Definitions =====

export interface UserProfile {
    uid: string;
    email: string;
    fullName: string;
    phone: string;
    location: string;
    accountType: "client" | "artist" | "owner";
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface Artist {
    id?: string;
    userId: string;
    name: string;
    specialty: string;
    rating: number;
    reviews: number;
    price: number;
    location: string;
    image: string;
    bio?: string;
    services: string[];
    availability?: any;
    createdAt: Timestamp;
}

export interface Booking {
    id?: string;
    userId: string;
    artistId: string;
    service: string;
    location: string;
    date: Timestamp;
    time: string;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    totalPrice: number;
    notes?: string;
    createdAt: Timestamp;
}

export interface Space {
    id?: string;
    ownerId: string;
    name: string;
    location: string;
    price: number;
    description: string;
    amenities: string[];
    images: string[];
    availability?: any;
    status: "available" | "rented";
    createdAt: Timestamp;
}

export interface SpaceBooking {
    id?: string;
    userId: string;
    spaceId: string;
    startDate: Timestamp;
    endDate: Timestamp;
    totalDays: number;
    totalPrice: number;
    status: "pending" | "confirmed" | "completed" | "cancelled";
    notes?: string;
    createdAt: Timestamp;
}

// ===== User Profile Functions =====

/**
 * Create a new user profile in Firestore
 */
export const createUserProfile = async (
    uid: string,
    data: Omit<UserProfile, "uid" | "createdAt" | "updatedAt">
): Promise<void> => {
    const userRef = doc(db, "users", uid);
    const timestamp = Timestamp.now();

    await setDoc(userRef, {
        uid,
        ...data,
        createdAt: timestamp,
        updatedAt: timestamp,
    });
};

/**
 * Get a user profile by UID
 */
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return userSnap.data() as UserProfile;
    }
    return null;
};

/**
 * Update a user profile
 */
export const updateUserProfile = async (
    uid: string,
    data: Partial<Omit<UserProfile, "uid" | "createdAt">>
): Promise<void> => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
        ...data,
        updatedAt: Timestamp.now(),
    });
};

// ===== Artist Functions =====

/**
 * Create a new artist profile
 */
export const createArtist = async (
    data: Omit<Artist, "id" | "createdAt">
): Promise<string> => {
    const artistRef = await addDoc(collection(db, "artists"), {
        ...data,
        createdAt: Timestamp.now(),
    });
    return artistRef.id;
};

/**
 * Get an artist by ID
 */
export const getArtist = async (id: string): Promise<Artist | null> => {
    const artistRef = doc(db, "artists", id);
    const artistSnap = await getDoc(artistRef);

    if (artistSnap.exists()) {
        return { id: artistSnap.id, ...artistSnap.data() } as Artist;
    }
    return null;
};

/**
 * Get all artists or filter by location
 */
export const getArtists = async (location?: string): Promise<Artist[]> => {
    const constraints: QueryConstraint[] = [];
    if (location) {
        constraints.push(where("location", "==", location));
    }

    const q = query(collection(db, "artists"), ...constraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Artist)
    );
};

/**
 * Update an artist profile
 */
export const updateArtist = async (
    id: string,
    data: Partial<Omit<Artist, "id" | "createdAt">>
): Promise<void> => {
    const artistRef = doc(db, "artists", id);
    await updateDoc(artistRef, data);
};

/**
 * Delete an artist
 */
export const deleteArtist = async (id: string): Promise<void> => {
    const artistRef = doc(db, "artists", id);
    await deleteDoc(artistRef);
};

// ===== Booking Functions =====

/**
 * Create a new booking
 */
export const createBooking = async (
    data: Omit<Booking, "id" | "createdAt">
): Promise<string> => {
    const bookingRef = await addDoc(collection(db, "bookings"), {
        ...data,
        createdAt: Timestamp.now(),
    });
    return bookingRef.id;
};

/**
 * Get a booking by ID
 */
export const getBooking = async (id: string): Promise<Booking | null> => {
    const bookingRef = doc(db, "bookings", id);
    const bookingSnap = await getDoc(bookingRef);

    if (bookingSnap.exists()) {
        return { id: bookingSnap.id, ...bookingSnap.data() } as Booking;
    }
    return null;
};

/**
 * Get all bookings for a user
 */
export const getUserBookings = async (userId: string): Promise<Booking[]> => {
    const q = query(collection(db, "bookings"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Booking)
    );
};

/**
 * Get all bookings for an artist
 */
export const getArtistBookings = async (artistId: string): Promise<Booking[]> => {
    const q = query(collection(db, "bookings"), where("artistId", "==", artistId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Booking)
    );
};

/**
 * Update a booking
 */
export const updateBooking = async (
    id: string,
    data: Partial<Omit<Booking, "id" | "createdAt">>
): Promise<void> => {
    const bookingRef = doc(db, "bookings", id);
    await updateDoc(bookingRef, data);
};

// ===== Space Functions =====

/**
 * Create a new space
 */
export const createSpace = async (
    data: Omit<Space, "id" | "createdAt">
): Promise<string> => {
    const spaceRef = await addDoc(collection(db, "spaces"), {
        ...data,
        createdAt: Timestamp.now(),
    });
    return spaceRef.id;
};

/**
 * Get a space by ID
 */
export const getSpace = async (id: string): Promise<Space | null> => {
    const spaceRef = doc(db, "spaces", id);
    const spaceSnap = await getDoc(spaceRef);

    if (spaceSnap.exists()) {
        return { id: spaceSnap.id, ...spaceSnap.data() } as Space;
    }
    return null;
};

/**
 * Get all spaces or filter by location
 */
export const getSpaces = async (location?: string): Promise<Space[]> => {
    const constraints: QueryConstraint[] = [];
    if (location) {
        constraints.push(where("location", "==", location));
    }

    const q = query(collection(db, "spaces"), ...constraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Space)
    );
};

/**
 * Update a space
 */
export const updateSpace = async (
    id: string,
    data: Partial<Omit<Space, "id" | "createdAt">>
): Promise<void> => {
    const spaceRef = doc(db, "spaces", id);
    await updateDoc(spaceRef, data);
};

/**
 * Delete a space
 */
export const deleteSpace = async (id: string): Promise<void> => {
    const spaceRef = doc(db, "spaces", id);
    await deleteDoc(spaceRef);
};

// ===== Space Booking Functions =====

/**
 * Create a new space booking
 */
export const createSpaceBooking = async (
    data: Omit<SpaceBooking, "id" | "createdAt">
): Promise<string> => {
    const spaceBookingRef = await addDoc(collection(db, "spaceBookings"), {
        ...data,
        createdAt: Timestamp.now(),
    });
    return spaceBookingRef.id;
};

/**
 * Get a space booking by ID
 */
export const getSpaceBooking = async (id: string): Promise<SpaceBooking | null> => {
    const spaceBookingRef = doc(db, "spaceBookings", id);
    const spaceBookingSnap = await getDoc(spaceBookingRef);

    if (spaceBookingSnap.exists()) {
        return { id: spaceBookingSnap.id, ...spaceBookingSnap.data() } as SpaceBooking;
    }
    return null;
};

/**
 * Get all space bookings for a user
 */
export const getUserSpaceBookings = async (userId: string): Promise<SpaceBooking[]> => {
    const q = query(collection(db, "spaceBookings"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as SpaceBooking)
    );
};

/**
 * Update a space booking
 */
export const updateSpaceBooking = async (
    id: string,
    data: Partial<Omit<SpaceBooking, "id" | "createdAt">>
): Promise<void> => {
    const spaceBookingRef = doc(db, "spaceBookings", id);
    await updateDoc(spaceBookingRef, data);
};

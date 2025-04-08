import { users, type User, type InsertUser, menuItems, type MenuItem, type InsertMenuItem, reservations, type Reservation, type InsertReservation, contactMessages, type ContactMessage, type InsertContactMessage } from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Menu operations
  getAllMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(category: string): Promise<MenuItem[]>;
  getMenuItem(id: number): Promise<MenuItem | undefined>;
  
  // Reservation operations
  getReservation(id: number): Promise<Reservation | undefined>;
  getReservationsByUserId(userId: number): Promise<Reservation[]>;
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  updateReservation(id: number, reservation: Partial<InsertReservation>): Promise<Reservation | undefined>;
  
  // Contact operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

import { db } from './db';
import { eq, and } from 'drizzle-orm';

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  
  async getUserByFirebaseUid(firebaseUid: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.firebaseUid, firebaseUid));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Menu operations
  async getAllMenuItems(): Promise<MenuItem[]> {
    return await db.select().from(menuItems);
  }
  
  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    return await db.select().from(menuItems).where(eq(menuItems.category, category));
  }
  
  async getMenuItem(id: number): Promise<MenuItem | undefined> {
    const [menuItem] = await db.select().from(menuItems).where(eq(menuItems.id, id));
    return menuItem;
  }
  
  // Reservation operations
  async getReservation(id: number): Promise<Reservation | undefined> {
    const [reservation] = await db.select().from(reservations).where(eq(reservations.id, id));
    return reservation;
  }
  
  async getReservationsByUserId(userId: number): Promise<Reservation[]> {
    return await db.select().from(reservations).where(eq(reservations.userId, userId));
  }
  
  async createReservation(insertReservation: InsertReservation): Promise<Reservation> {
    const [reservation] = await db
      .insert(reservations)
      .values({
        ...insertReservation,
        status: "confirmed" 
      })
      .returning();
    return reservation;
  }
  
  async updateReservation(id: number, partialReservation: Partial<InsertReservation>): Promise<Reservation | undefined> {
    const [updatedReservation] = await db
      .update(reservations)
      .set(partialReservation)
      .where(eq(reservations.id, id))
      .returning();
    return updatedReservation;
  }
  
  // Contact operations
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }

  // Initialization method to seed menu items if empty
  async initializeMenuItemsIfEmpty() {
    try {
      const existingItems = await this.getAllMenuItems();
      
      if (existingItems.length === 0) {
        const sampleItems: InsertMenuItem[] = [
          {
            name: "Butter Chicken",
            description: "Tender chicken pieces simmered in a rich, creamy tomato sauce with aromatic spices.",
            price: 35000, // 350 rupees
            image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641",
            category: "Main Course",
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: true,
            isSpicy: true
          },
          {
            name: "Paneer Tikka",
            description: "Grilled cottage cheese cubes marinated in spices and yogurt, cooked in a tandoor.",
            price: 25000, // 250 rupees
            image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
            category: "Starters",
            isVegetarian: true,
            isVegan: false,
            isGlutenFree: true,
            isSpicy: false
          },
          {
            name: "Chicken Biryani",
            description: "Fragrant basmati rice cooked with tender chicken pieces and aromatic spices.",
            price: 32000, // 320 rupees
            image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
            category: "Main Course",
            isVegetarian: false,
            isVegan: false,
            isGlutenFree: false,
            isSpicy: true
          },
          {
            name: "Garlic Naan",
            description: "Soft and fluffy bread topped with garlic and butter, baked in a tandoor oven.",
            price: 8000, // 80 rupees
            image: "https://images.unsplash.com/photo-1590112617722-9afb8ae1e0e8",
            category: "Main Course",
            isVegetarian: true,
            isVegan: false,
            isGlutenFree: false,
            isSpicy: false
          },
          {
            name: "Palak Paneer",
            description: "Cottage cheese cubes in a creamy spinach sauce, flavored with aromatic Indian spices.",
            price: 28000, // 280 rupees
            image: "https://images.unsplash.com/photo-1618449840665-9ed506d73a34",
            category: "Main Course",
            isVegetarian: true,
            isVegan: false,
            isGlutenFree: true,
            isSpicy: false
          },
          {
            name: "Chana Masala",
            description: "Chickpeas cooked in a spicy tomato gravy with authentic Indian spices.",
            price: 22000, // 220 rupees
            image: "https://images.unsplash.com/photo-1546833998-877b37c2e5c6",
            category: "Main Course",
            isVegetarian: true,
            isVegan: true,
            isGlutenFree: true,
            isSpicy: true
          },
          {
            name: "Gulab Jamun",
            description: "Soft milk solids dumplings soaked in rose-flavored sugar syrup.",
            price: 15000, // 150 rupees
            image: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10",
            category: "Desserts",
            isVegetarian: true,
            isVegan: false,
            isGlutenFree: true,
            isSpicy: false
          },
          {
            name: "Masala Chai",
            description: "Traditional Indian spiced tea with ginger, cardamom, and other aromatic spices.",
            price: 9000, // 90 rupees
            image: "https://images.unsplash.com/photo-1593400652206-dfe37e3c7adb",
            category: "Beverages",
            isVegetarian: true,
            isVegan: false,
            isGlutenFree: true,
            isSpicy: false
          }
        ];
        
        await db.insert(menuItems).values(sampleItems);
        console.log("Successfully added sample menu items to database");
      } else {
        // Check if dietary preferences are properly set
        const needsUpdate = existingItems.some(item => 
          item.isVegetarian === false && 
          item.isVegan === false && 
          item.isGlutenFree === false && 
          item.isSpicy === false
        );
        
        if (needsUpdate) {
          console.log("Updating menu items with proper dietary preferences...");
          
          // Update dietary preferences for Butter Chicken
          await db
            .update(menuItems)
            .set({ isVegetarian: false, isVegan: false, isGlutenFree: true, isSpicy: true })
            .where(eq(menuItems.name, "Butter Chicken"));
            
          // Update dietary preferences for Paneer Tikka
          await db
            .update(menuItems)
            .set({ isVegetarian: true, isVegan: false, isGlutenFree: true, isSpicy: false })
            .where(eq(menuItems.name, "Paneer Tikka"));
            
          // Update dietary preferences for Chicken Biryani
          await db
            .update(menuItems)
            .set({ isVegetarian: false, isVegan: false, isGlutenFree: false, isSpicy: true })
            .where(eq(menuItems.name, "Chicken Biryani"));
            
          // Update dietary preferences for Garlic Naan
          await db
            .update(menuItems)
            .set({ isVegetarian: true, isVegan: false, isGlutenFree: false, isSpicy: false })
            .where(eq(menuItems.name, "Garlic Naan"));
            
          // Update dietary preferences for Gulab Jamun
          await db
            .update(menuItems)
            .set({ isVegetarian: true, isVegan: false, isGlutenFree: true, isSpicy: false })
            .where(eq(menuItems.name, "Gulab Jamun"));
            
          // Update dietary preferences for Masala Chai
          await db
            .update(menuItems)
            .set({ isVegetarian: true, isVegan: false, isGlutenFree: true, isSpicy: false })
            .where(eq(menuItems.name, "Masala Chai"));
            
          console.log("Completed updating menu items dietary preferences");
        }
      }
    } catch (error) {
      console.error("Error in initializeMenuItemsIfEmpty:", error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();

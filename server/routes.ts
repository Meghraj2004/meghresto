import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReservationSchema, insertContactMessageSchema, insertUserSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // Menu routes
  app.get("/api/menu", async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string | undefined;
      let menuItems;
      
      if (category) {
        menuItems = await storage.getMenuItemsByCategory(category);
      } else {
        menuItems = await storage.getAllMenuItems();
      }
      
      res.json(menuItems);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      res.status(500).json({ 
        message: "Error retrieving menu items",
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });
  
  app.get("/api/menu/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid menu item ID" });
      }
      
      const menuItem = await storage.getMenuItem(id);
      if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      
      res.json(menuItem);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving menu item" });
    }
  });
  
  // Reservation routes
  app.post("/api/reservations", async (req: Request, res: Response) => {
    try {
      const validatedData = insertReservationSchema.parse(req.body);
      const reservation = await storage.createReservation(validatedData);
      
      // In a real app, send email notification via Web3Forms API
      // This would be handled here
      
      res.status(201).json(reservation);
    } catch (error) {
      res.status(400).json({ message: "Invalid reservation data", error });
    }
  });
  
  app.get("/api/reservations", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.query.userId as string);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const reservations = await storage.getReservationsByUserId(userId);
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving reservations" });
    }
  });
  
  app.put("/api/reservations/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid reservation ID" });
      }
      
      const updatedReservation = await storage.updateReservation(id, req.body);
      if (!updatedReservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }
      
      res.json(updatedReservation);
    } catch (error) {
      res.status(500).json({ message: "Error updating reservation" });
    }
  });
  
  // User management
  app.post("/api/users/firebase", async (req: Request, res: Response) => {
    try {
      const { firebaseUid, email, name, username } = req.body;
      
      if (!firebaseUid) {
        return res.status(400).json({ message: "Firebase UID is required" });
      }

      // Check if user already exists
      let user = await storage.getUserByFirebaseUid(firebaseUid);
      
      if (!user) {
        // Create new user if not exists
        const newUserData = {
          username,
          email,
          name,
          firebaseUid,
          // Generate random password as it's not used for firebase auth
          password: Math.random().toString(36).slice(-10)
        };
        
        try {
          const validatedUser = insertUserSchema.parse(newUserData);
          user = await storage.createUser(validatedUser);
        } catch (err) {
          if (err instanceof ZodError) {
            return res.status(400).json({ 
              message: "Invalid user data", 
              errors: err.errors 
            });
          }
          throw err;
        }
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error syncing firebase user:", error);
      res.status(500).json({ 
        message: "Error syncing user with database", 
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      
      // In a real app, send email notification via Web3Forms API
      // This would be handled here
      
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact form data", error });
    }
  });
  
  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}

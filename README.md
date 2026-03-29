# 🐾 Pareit: Multi-Tier Pet Care Ecosystem
<p align="center">
  <img src="https://img.shields.io/badge/Architecture-MERN%20Stack-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Security-RBAC%20Auth-red?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb" />
</p>

**Pareit** is a sophisticated pet-care marketplace and management platform. It creates a seamless bridge between pet owners seeking high-quality care and professional service providers, all moderated by a powerful administrative oversight system.

---

## 📸 System Interface
<p align="center">
  <img src="./assets/pareit-dashboard.png" width="850" alt="Pareit Platform Preview">
</p>

---

## 👥 Multi-User Roles & Permissions

### 👤 1. Customer (Pet Owner)
- **Service Discovery:** Browse and filter pet caring services (grooming, boarding, walking).
- **Booking Engine:** Book services in real-time with specific date/time slots.
- **Pet Profiles:** Manage digital health and identity records for multiple pets.
- **Review System:** Rate and review providers based on service quality.

### 🏨 2. Provider (Service Expert)
- **Service Management:** List and customize pet care offerings and pricing.
- **Request Dashboard:** Accept, decline, or manage incoming service bookings.
- **Earning Analytics:** Track revenue and service history within a dedicated portal.
- **Profile Branding:** Show certificates and experience to attract more customers.

### 🛡️ 3. Admin (The Orchestrator)
- **User Moderation:** Verify and manage both Provider and Customer accounts.
- **Dispute Resolution:** Monitor transactions and resolve booking conflicts.
- **System Analytics:** High-level overview of platform growth and activity metrics.
- **Content Control:** Ensure the platform remains safe and professional.

---

## 🛠️ Technical Implementation
| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js,CSS|
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Complex Schemas for User-Provider relations) |
| **Auth** | JWT-based **Role-Based Access Control (RBAC)** |

---

## 🏗️ Project Architecture (RBAC Flow)
```mermaid
graph TD
    A[User Login] --> B{Role Check}
    B -->|Customer| C[Book Services]
    B -->|Provider| D[Manage Listings]
    B -->|Admin| E[Global Oversight]
    C --> F[(Shared Database)]
    D --> F
    E --> F

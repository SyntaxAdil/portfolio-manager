# 🗂️ Portfolio Manager

> A personal project management dashboard that gives you a **public API** to showcase your projects anywhere — portfolio sites, resumes, or any frontend.

![Portfolio Manager Screenshot](./screenshot.png)

---

## ✨ What is this?

**Portfolio Manager** lets you log in, manage your projects in one place, and get a unique public API endpoint — so you can fetch and display your projects on any website or app without building a backend yourself.

---

## 🚀 How it works

1. **Sign up / Log in** to your dashboard
2. **Add your projects** — title, description, thumbnail, tech stack, GitHub & live links
3. **Get your personal API URL** — something like:
   ```
   https://portfolio-manager.vercel.app/api/project/{your-user-id}
   ```
4. **Use it anywhere** — call that URL from your portfolio site, resume page, or any app

---

## 🔗 Using the API

Once logged in, you'll find your unique API URL in the dashboard. Use it with a simple `fetch` call:

```js
const res = await fetch("https://portfolio-manager.vercel.app/api/project/YOUR_USER_ID");
const { data } = await res.json();

// data is an array of your projects
console.log(data);
```

### Response shape

```json
[
  {
    "_id": "...",
    "title": "My Awesome App",
    "description": "A brief description of the project.",
    "image": "https://image-url.com/thumb.png",
    "github": "https://github.com/you/repo",
    "live": "https://yourapp.com",
    "tech": [
      { "id": "uuid", "tag": "Next.js" },
      { "id": "uuid", "tag": "MongoDB" }
    ]
  }
]
```

---

## 🛠️ Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/SyntaxAdil/portfolio-manager.git
cd portfolio-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env.local`

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_auth_secret
NEXT_PUBLIC_BASE_URI=http://localhost:3000
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Database | MongoDB + Mongoose |
| Auth | Better Auth |
| UI | shadcn/ui + Tailwind CSS |
| Image Hosting | ImgBB (free) |

---

## 📁 Project Structure

```
portfolio-manager/
├── app/
│   ├── api/
│   │   └── project/        # POST, PATCH, DELETE, GET handlers
│   └── (pages)/
├── components/
│   ├── model/              # EditPopUp, DltPopUp, AddProject dialogs
│   └── ui/                 # shadcn components
├── lib/
│   ├── db.js               # MongoDB connection
│   └── auth/               # Better Auth config
└── model/
    └── project-model.js    # Mongoose schema
```

---

## 🌐 Deploying to Vercel

1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy — your API is live!

---

## 🙋 FAQ

**Do I need to build my own backend?**
No. Just use the API URL from your dashboard — it's ready to go.

**Is the API public?**
Yes. Your project data is publicly readable via your API URL. Writes (add/edit/delete) require authentication.

**Where do I host project images?**
Use [ImgBB](https://imgbb.com) — it's free and gives you a direct image URL.

---

## 📄 License

MIT — free to use and modify.

---

Made with ❤️ by [SyntaxAdil](https://github.com/SyntaxAdil)
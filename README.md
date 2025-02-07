# 🚀 GitHub Repository Explorer
A simple **React + TypeScript + Zustand** project to search and star GitHub repositories effortlessly.

---

## 📌 Features
✅ Search GitHub repositories by keyword  
✅ Star and unstar repositories  
✅ Zustand state management with **DevTools** support  
✅ **Bootstrap-based** responsive UI  
✅ Loading indicators for a smooth user experience  
✅ Lightweight and fast with **Vite**  

---

## 📂 Folder Structure
```
📦 github-explorer
├── 📂 src
│   ├── 📂 api          # API calls
│   │   ├── axiosInstance.ts
│   │   ├── githubApi.ts
│   ├── 📂 components   # UI components
│   │   ├── 📂 Buttons
│   │   ├── 📂 Loader
│   │   ├── 📂 RepoCard
│   │   ├── 📂 RepoList
│   │   ├── 📂 Search
│   ├── 📂 screens      # App pages
│   │   ├── Home.tsx
│   │   ├── Home.module.css
│   ├── 📂 store        # Zustand state management
│   │   ├── repoStore.ts
│   ├── 📂 styles       # Global styles
│   │   ├── global.css
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # React entry point
│   ├── index.css       # Base styles
│   ├── vite-env.d.ts   # Vite environment types
│   ├── .env.example    # Example environment file
├── package.json        # Dependencies and scripts
├── README.md           # Project documentation
```

---

## 📦 Installation

### 1️⃣ Clone the repository
```sh
git clone https://github.com/your-username/github-explorer.git
cd github-explorer
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Set up environment variables
Rename `.env.example` to `.env` and add your **GitHub API Token**:

```
VITE_GITHUB_API_TOKEN=your_personal_access_token
```
🔗 You can create a **GitHub Personal Access Token (PAT)** [here](https://github.com/settings/tokens).

### 4️⃣ Run the development server
```sh
npm run dev
```

---

## 🛠 Technologies Used
- **React + Vite** – Frontend framework
- **TypeScript** – Type safety
- **Zustand** – State management
- **Bootstrap** – UI styling
- **Zustand DevTools** – Debugging store state
- **Axios** – API requests

---

## 📜 License
This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## 📧 Contact
For any inquiries, reach out at [ahmedibrahim287@outlook.sa](mailto:ahmedibrahim287@outlook.sa).

Happy coding! 🎉


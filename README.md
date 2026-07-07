# Solindie Games Website

Static website for **Solindie Games**, an indie game studio. Built for deployment on [GitHub Pages](https://pages.github.com/).

## Pages

- **Home** (`index.html`) — Hero, featured game teaser, about teaser
- **Games** (`games.html`) — UMPB showcase and gallery
- **About** (`about.html`) — Studio information

## Local Preview

Open `index.html` in a browser, or serve the folder with any static file server:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve .
```

Then visit `http://localhost:8000`.

## Deploy to GitHub Pages

1. Initialize git and commit the site (if not already done):

   ```bash
   git init
   git add .
   git commit -m "Add Solindie Games website"
   ```

2. Create a repository on GitHub (e.g. `SolindieGames`) and push:

   ```bash
   git branch -M main
   git remote add origin https://github.com/<username>/SolindieGames.git
   git push -u origin main
   ```

3. On GitHub, go to **Settings → Pages**.

4. Under **Build and deployment**, set:
   - **Source:** Deploy from a branch
   - **Branch:** `main` / `/ (root)`

5. Save. The site will be available at:

   ```
   https://<username>.github.io/SolindieGames/
   ```

## Custom Domain (optional)

Add a `CNAME` file at the repo root containing your domain (e.g. `solindiegames.com`), then configure DNS with your provider.

## Structure

```
├── index.html
├── about.html
├── games.html
├── css/styles.css
├── js/main.js
└── assets/
    ├── logo/
    ├── umpb/
    └── headers/
```

Original source assets remain in `logo/`, `Images/`, and `headers/`.

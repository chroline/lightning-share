<a href='https://github.com/chroline/lightning-share'>
  
<img alt="LIGHTNING SHARE" src="assets/thumbnail.svg" width="100%" />
  
</a>

<br />
<br />

<p align='center'>
  
<a href='https://lightning-share.vercel.app'>
  
<img alt="Hosted on Vercel" src='https://img.shields.io/badge/hosted%20on-vercel-black?logo=vercel&style=for-the-badge'>
  
</a>
  
<a href='https://github.com/chroline/lightning-share/blob/main/LICENSE'>
  
<img alt="MIT License" src='https://img.shields.io/github/license/chroline/lightning-share?style=for-the-badge'>
  
</a>
  
</p>

<br />

<div align='center'>
  
# ⚡️ LIGHTNING SHARE

**a project created by [Cole Gawin](https://github.com/chroline)**

<br />
  
### [Check it out](https://lightning-share.vercel.app) | [Learn how it's made](/#) | [Support the project](https://github.com/chroline/lightning-share#%EF%B8%8F-support-this-project)
  
</div>

<br />

---

<br />

# 👋 Introduction

LIGHTNING SHARE is a file hosting and sharing service powered by [Firebase](https://firebase.google.com). Users can upload files under 20MB and download hosted files using a "share code" (a short 3 word code provided by [words-aas](https://words-aas.vercel.app)). After uploading a file, the file uploader can retrieve the share code and share it with others or delete the file at any time. Files will automatically be deleted after 21 days (WIP).

# 🚀 Usage

|**Upload** | **Download** |
|---|---|
|![Uploading a file](https://raw.githubusercontent.com/chroline/lightning-share/main/assets/upload.gif)|![Downloading a file](https://raw.githubusercontent.com/chroline/lightning-share/main/assets/download.gif)|

# 🧑‍💻 Development

1. 📂 Clone this repo

2. 📦 Install dependencies with `yarn`

3. 🏃 Start the Vite dev server with `yarn dev`

4. 🌎 Visit the provided link in your browser

## Firebase

Firebase is used to power the authentication, database, and file storage for LIGHTNING SHARE. For security reasons, the production LIGHTING SHARE Firebase project is not available for local development on `localhost`. As such, you will need to create your own Firebase project for local development purposes.

On your development Firebase project:

1. Enable anonymous authentication.
2. Ensure `localhost` is an authorized domain for authentication.
3. Enable Firestore Database and Storage features.

Replace the [`firebaseConfig` variable](https://github.com/chroline/lightning-share/blob/main/src/util/firebase-config.ts#L1) in [`src/util/firebase-config.ts`](https://github.com/chroline/lightning-share/blob/main/src/util/firebase-config.ts) with the config for your Firebase project.

# ❤️ Support this project

If you want to say thank you and/or support active development of LIGHTNING SHARE:

- Add a GitHub Star to the project!
- Tweet about the project on your Twitter!
  - Tag [@colegawin_](https://twitter.com/colegawin_) and mention "LIGHTNING SHARE"
- Leave a comment or a reaction on the tutorial of how this project was built!

Thanks so much for your interest in supporting LIGHTNING SHARE!

_**PS:** consider sponsoring me ([Cole Gawin](https://colegaw.in)) to continue the development of this project on [BuyMeACoffee](https://buymeacoffee.com/colegawin) :)_

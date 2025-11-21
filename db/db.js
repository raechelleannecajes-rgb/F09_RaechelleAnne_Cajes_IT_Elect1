import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

let SQLite = null;
try {
  SQLite = require("expo-sqlite");
} catch (e) {
  SQLite = null;
}

let db = null;
let usingSqlite = false;
let users = [];
let messages = [];
let nextUserId = 1;
let nextMessageId = 1;

async function loadFallbackData() {
  try {
    const u = await AsyncStorage.getItem("@messenger_users");
    const m = await AsyncStorage.getItem("@messenger_messages");
    users = u ? JSON.parse(u) : [];
    messages = m ? JSON.parse(m) : [];
    nextUserId = users.length ? Math.max(...users.map((x) => x.id)) + 1 : 1;
    nextMessageId = messages.length ? Math.max(...messages.map((x) => x.id)) + 1 : 1;
  } catch {
    users = [];
    messages = [];
  }
}

async function persistFallback() {
  await AsyncStorage.setItem("@messenger_users", JSON.stringify(users));
  await AsyncStorage.setItem("@messenger_messages", JSON.stringify(messages));
}

export async function initDb() {
  if (SQLite && typeof SQLite.openDatabase === "function") {
    try {
      db = SQLite.openDatabase("messenger.db");
      usingSqlite = true;
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            name TEXT,
            password TEXT,
            profile_uri TEXT
          );`
        );
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            senderId INTEGER,
            receiverId INTEGER,
            text TEXT,
            createdAt INTEGER
          );`
        );
      });
      console.log("[DB] SQLite ready");
      return true;
    } catch (e) {
      console.warn("[DB] SQLite failed, fallback", e);
      usingSqlite = false;
    }
  }
  usingSqlite = false;
  await loadFallbackData();
  console.log("[DB] Using AsyncStorage fallback");
  return true;
}

// ---- USERS ----
export async function createUser({ email, name, password }) {
  if (usingSqlite && db) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO users (email,name,password) VALUES (?,?,?)",
          [email, name, password],
          (_, res) => resolve(res.insertId),
          (_, err) => reject(err)
        );
      });
    });
  }

  if (!users.length) await loadFallbackData();
  if (users.find((u) => u.email === email)) throw new Error("Email already exists");
  const newUser = { id: nextUserId++, email, name, password, profile_uri: null };
  users.push(newUser);
  await persistFallback();
  return newUser.id;
}

export async function findUserByEmail(email) {
  if (usingSqlite && db) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM users WHERE email=?",
          [email],
          (_, { rows }) => resolve(rows.length ? rows.item(0) : null)
        );
      });
    });
  }
  if (!users.length) await loadFallbackData();
  return users.find((u) => u.email === email) || null;
}

// **Return all other users except the logged-in user**
export async function getAllUsers(excludeId = null) {
  if (usingSqlite && db) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          excludeId ? "SELECT * FROM users WHERE id != ?" : "SELECT * FROM users",
          excludeId ? [excludeId] : [],
          (_, { rows }) => resolve(rows._array)
        );
      });
    });
  }
  if (!users.length) await loadFallbackData();
  return users.filter((u) => u.id !== excludeId);
}

// ---- MESSAGES ----
export async function saveMessage({ senderId, receiverId, text, createdAt }) {
  if (usingSqlite && db) {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO messages (senderId,receiverId,text,createdAt) VALUES (?,?,?,?)",
          [senderId, receiverId, text, createdAt],
          (_, res) => resolve(res.insertId),
          (_, err) => reject(err)
        );
      });
    });
  }

  if (!messages.length) await loadFallbackData();
  const newMsg = { id: nextMessageId++, senderId, receiverId, text, createdAt };
  messages.push(newMsg);
  await persistFallback();
  return newMsg.id;
}

// **Get all messages between two users**
export async function getConversation(a, b) {
  if (usingSqlite && db) {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM messages WHERE (senderId=? AND receiverId=?) OR (senderId=? AND receiverId=?) ORDER BY createdAt ASC",
          [a, b, b, a],
          (_, { rows }) => resolve(rows._array)
        );
      });
    });
  }

  if (!messages.length) await loadFallbackData();
  return messages.filter(
    (m) =>
      (m.senderId === a && m.receiverId === b) ||
      (m.senderId === b && m.receiverId === a)
  );
}
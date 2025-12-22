import { UsersManagment } from "./data-model"

export const user_mgr = new UsersManagment();

user_mgr.addNewUser("Simone", "Stridi", "Prof1", "simo@gmail.com", 20, "Italia", ["Italiano", "Inglese"], ["STUDENT, TEACHER"]);
user_mgr.addNewUser("Chiara", "Rossi", "Chi123", "chiara@gmail.com", 34, "Francia", ["Francese", "Inglese", "Italiano"], ["STUDENT, TEACHER"]);
user_mgr.addNewUser("Marco", "Grana", "SimoStr", "marco@gmail.com", 27, "Italia", ["Italiano"], ["STUDENT"]);
user_mgr.addNewUser("Giulia", "Marche", "giu", "giulia@gmail.com", 21, "Inghilterra", ["Inglese", "Italiano"], ["STUDENT"]);

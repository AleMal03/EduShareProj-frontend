import { UsersManagment } from "./data-model"

export const user_mgr = new UsersManagment();

user_mgr.addNewUser("Simone", "Stridi", "Simo_prof", "simo@gmail.com", 20, "Italia", ["Italiano", "Inglese"]);
user_mgr.addNewUser("Chiara", "Rossi", "ch_crf1", "chiara@gmail.com", 34, "Francia", ["Francese", "Inglese", "Italiano"]);
user_mgr.addNewUser("Marco", "Grana", "marcooo", "marco@gmail.com", 27, "Italia", ["Italiano"]);
user_mgr.addNewUser("Giulia", "Marche", "giu", "giulia@gmail.com", 21, "Inghilterra", ["Inglese", "Italiano"]);
import {Mongo} from "meteor/mongo";
players = new Mongo.Collection("players");

export const Players = players;

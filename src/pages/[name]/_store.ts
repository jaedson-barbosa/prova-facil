import { writable } from "svelte/store";
import type Project from "../_scripts/project";

export const project = writable<Project>(undefined)
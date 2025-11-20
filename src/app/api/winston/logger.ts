
"use server";

import logger from "@/lib/logger";


export async function accountCreationAttempt() {
    logger.warn("The user is creating an account");
}

export async function emailAttempt() {
    logger.warn("The user email did not meet the requirements");
}

export async function passwordAttempt() {
    logger.warn("The user password did not meet the requirements");
}

export async function logSignUpError() {
    logger.warn("The user email or password did not meet the requirements");
}

export async function checkingPassword() {
    logger.verbose("Checking the user inputed password");
}

export async function loadCourseStructure() {
    logger.error("There is an error trying to fetch the course structure from the json files");
}

export async function findingError() {
    logger.debug("Debugging the function in login");
}

export async function hashPwd(password: string) {
    // Dynamic import loaded only when the function is called
    const { genSalt, hash } = await import("bcrypt-ts");

    const saltRounds = 15;
    const salt = await genSalt(saltRounds);
    const result = await hash(password, salt);
    return result;  //hashed pwd
}

export async function compareHashes(password: string, hash:string) {
    const { compare } = await import("bcrypt-ts");
    
    const isCorrectPwd = await compare(password, hash);
    return isCorrectPwd;
}
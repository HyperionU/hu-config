export const getUserPkgManager = () => {
    // This environment variable is set by npm and yarn but pnpm seems less consistent
    const userAgent = process.env.npm_config_user_agent;

    if (!userAgent) {
        return "npm";
    }
    
    return userAgent.startsWith("yarn") ? "yarn" : 
        userAgent.startsWith("pnpm") ? "pnpm" :
        userAgent.startsWith("bun") ? "bun" : "npm";
};
// logging_middleware/logger.js

export const Log = async (stack, level, pkg, message) => {
    // 1. Validate inputs (Constraint: must be lower case)
    const validStacks = ["backend", "frontend"];
    const validLevels = ["debug", "info", "warn", "error", "fatal"];
    
    // Note: Add all valid packages based on your requirements
    const validPackages = ["cache", "controller", "cron_job", "service", 
                           "api", "component", "hook", "page", "state", "style", 
                           "auth", "config", "middleware", "utils", "handler"];

    if (!validStacks.includes(stack) || !validLevels.includes(level) || !validPackages.includes(pkg)) {
        console.error("Invalid log parameters provided");
        return;
    }

    // 2. Prepare payload
    const payload = { stack, level, package: pkg, message };

    // 3. Send to test server
    try {
        const response = await fetch('http://4.224.186.213/evaluation-service/logs', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                // Add Authorization header here if the "protected route" requires a token
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Logging failed');
        const data = await response.json();
        console.log("Log created:", data.logID);
    } catch (err) {
        console.error("Error sending log:", err);
    }
};
/// <reference path="../pb_data/types.d.ts" />

migrate((app) => {
    // Create a default superuser so you can log into the admin UI immediately
    const email = "admin@local";
    const password = "Admin123!"; // change after first login

    function generateAlphaNum(length) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let out = "";
        for (let i = 0; i < length; i++) {
            out += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return out;
    }

    try {
        const collection = app.findCollectionByNameOrId("_superusers");

        // Skip if already exists
        try {
            const existing = app.findFirstRecordByData(collection.id, "email", email);
            if (existing) {
                console.log("Default superuser already exists, skipping seeding.");
                return;
            }
        } catch (e) {
            // findFirstRecordByData throws if not found → proceed to create
        }

        const record = new Record(collection);
        unmarshal({
            email,
            password,
            verified: true,
            tokenKey: generateAlphaNum(50)
        }, record);

        app.save(record);
        console.log("✅ Default superuser created:", email);
    } catch (e) {
        console.error("Failed to seed default superuser:", e);
        throw e;
    }
}, (app) => {
    // Rollback: remove the seeded default superuser
    const email = "admin@local";
    try {
        const collection = app.findCollectionByNameOrId("_superusers");
        const rec = app.findFirstRecordByData(collection.id, "email", email);
        if (rec) {
            app.delete(rec);
            console.log("✅ Default superuser removed:", email);
        }
    } catch (e) {
        console.warn("Skip removing default superuser:", e?.message || e);
    }
});



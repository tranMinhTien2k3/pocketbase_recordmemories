migrate((db) => {
    console.log("Creating sorting indexes...")

    db.run("CREATE INDEX IF NOT EXISTS idx_stories_sorting_basic ON stories (privacy, created DESC)")
    db.run("CREATE INDEX IF NOT EXISTS idx_stories_location_public ON stories (privacy) WHERE location IS NOT NULL AND privacy = 'public'")
    db.run("CREATE INDEX IF NOT EXISTS idx_stories_user_privacy ON stories (user_id, privacy)")

    db.run("CREATE INDEX IF NOT EXISTS idx_journeys_sorting_basic ON journeys (privacy, is_draft, created DESC)")
    db.run("CREATE INDEX IF NOT EXISTS idx_journeys_user_privacy ON journeys (user_id, privacy, is_draft)")
    db.run("CREATE INDEX IF NOT EXISTS idx_journeys_dates ON journeys (start_date, end_date) WHERE start_date IS NOT NULL")

    db.run("CREATE INDEX IF NOT EXISTS idx_story_likes_aggregation ON story_likes (story_id)")
    db.run("CREATE INDEX IF NOT EXISTS idx_journey_likes_aggregation ON journey_likes (journey_id)")

    db.run("CREATE INDEX IF NOT EXISTS idx_comments_story_aggregation ON comments (story_id) WHERE story_id IS NOT NULL")
    db.run("CREATE INDEX IF NOT EXISTS idx_comments_journey_aggregation ON comments (journey_id) WHERE journey_id IS NOT NULL")

    db.run("CREATE INDEX IF NOT EXISTS idx_shares_story_aggregation ON shares (story_id) WHERE story_id IS NOT NULL")
    db.run("CREATE INDEX IF NOT EXISTS idx_shares_journey_aggregation ON shares (journey_id) WHERE journey_id IS NOT NULL")

    db.run("CREATE INDEX IF NOT EXISTS idx_saves_story_aggregation ON saves (story_id) WHERE story_id IS NOT NULL")
    db.run("CREATE INDEX IF NOT EXISTS idx_saves_journey_aggregation ON saves (journey_id) WHERE journey_id IS NOT NULL")

    db.run("CREATE INDEX IF NOT EXISTS idx_followers_sorting ON followers (following_id, follower_id, status)")

    console.log("✅ Sorting indexes created successfully")
}, (db) => {
    console.log("Rolling back sorting indexes...")

    const indexesToDrop = [
        "idx_stories_sorting_basic",
        "idx_stories_location_public",
        "idx_stories_user_privacy",
        "idx_journeys_sorting_basic",
        "idx_journeys_user_privacy",
        "idx_journeys_dates",
        "idx_story_likes_aggregation",
        "idx_journey_likes_aggregation",
        "idx_comments_story_aggregation",
        "idx_comments_journey_aggregation",
        "idx_shares_story_aggregation",
        "idx_shares_journey_aggregation",
        "idx_saves_story_aggregation",
        "idx_saves_journey_aggregation",
        "idx_followers_sorting"
    ]

    indexesToDrop.forEach(name => {
        try {
            db.run(`DROP INDEX IF EXISTS ${name}`)
        } catch (e) {
            console.warn(`Failed to drop index ${name}:`, e)
        }
    })

    console.log("✅ Sorting indexes rolled back successfully")
})

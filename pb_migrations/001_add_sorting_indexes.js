/// <reference path="../pb_data/types.d.ts" />

migrate((db) => {  // Sử dụng db thay vì app
    console.log("Creating sorting indexes...")
    
    // Stories indexes
    db.exec(`
        CREATE INDEX IF NOT EXISTS idx_stories_sorting_basic 
        ON stories (privacy, created DESC);
        
        CREATE INDEX IF NOT EXISTS idx_stories_location_public 
        ON stories (privacy) 
        WHERE location IS NOT NULL AND privacy = 'public';
        
        CREATE INDEX IF NOT EXISTS idx_stories_user_privacy 
        ON stories (user_id, privacy);
    `)
    
    // Journeys indexes
    db.exec(`
        CREATE INDEX IF NOT EXISTS idx_journeys_sorting_basic 
        ON journeys (privacy, is_draft, created DESC);
        
        CREATE INDEX IF NOT EXISTS idx_journeys_user_privacy 
        ON journeys (user_id, privacy, is_draft);
        
        CREATE INDEX IF NOT EXISTS idx_journeys_dates 
        ON journeys (start_date, end_date) 
        WHERE start_date IS NOT NULL;
    `)
    
    // Engagement indexes
    db.exec(`
        CREATE INDEX IF NOT EXISTS idx_story_likes_aggregation 
        ON story_likes (story_id);
        
        CREATE INDEX IF NOT EXISTS idx_journey_likes_aggregation 
        ON journey_likes (journey_id);
        
        CREATE INDEX IF NOT EXISTS idx_comments_story_aggregation 
        ON comments (story_id) 
        WHERE story_id IS NOT NULL;
        
        CREATE INDEX IF NOT EXISTS idx_comments_journey_aggregation 
        ON comments (journey_id) 
        WHERE journey_id IS NOT NULL;
        
        CREATE INDEX IF NOT EXISTS idx_shares_story_aggregation 
        ON shares (story_id) 
        WHERE story_id IS NOT NULL;
        
        CREATE INDEX IF NOT EXISTS idx_shares_journey_aggregation 
        ON shares (journey_id) 
        WHERE journey_id IS NOT NULL;
        
        CREATE INDEX IF NOT EXISTS idx_saves_story_aggregation 
        ON saves (story_id) 
        WHERE story_id IS NOT NULL;
        
        CREATE INDEX IF NOT EXISTS idx_saves_journey_aggregation 
        ON saves (journey_id) 
        WHERE journey_id IS NOT NULL;
    `)
    
    // Friends/Followers indexes
    db.exec(`
        CREATE INDEX IF NOT EXISTS idx_followers_sorting 
        ON followers (following_id, follower_id, status);
    `)
    
    console.log("✅ Sorting indexes created successfully")
}, (db) => {  // Rollback cũng sử dụng db
    console.log("Rolling back sorting indexes...")
    
    // Rollback - xóa tất cả indexes đã tạo
    db.exec(`
        DROP INDEX IF EXISTS idx_stories_sorting_basic;
        DROP INDEX IF EXISTS idx_stories_location_public;
        DROP INDEX IF EXISTS idx_stories_user_privacy;
        DROP INDEX IF EXISTS idx_journeys_sorting_basic;
        DROP INDEX IF EXISTS idx_journeys_user_privacy;
        DROP INDEX IF EXISTS idx_journeys_dates;
        DROP INDEX IF EXISTS idx_story_likes_aggregation;
        DROP INDEX IF EXISTS idx_journey_likes_aggregation;
        DROP INDEX IF EXISTS idx_comments_story_aggregation;
        DROP INDEX IF EXISTS idx_comments_journey_aggregation;
        DROP INDEX IF EXISTS idx_shares_story_aggregation;
        DROP INDEX IF EXISTS idx_shares_journey_aggregation;
        DROP INDEX IF EXISTS idx_saves_story_aggregation;
        DROP INDEX IF EXISTS idx_saves_journey_aggregation;
        DROP INDEX IF EXISTS idx_followers_sorting;
    `)
    
    console.log("✅ Sorting indexes rolled back successfully")
})
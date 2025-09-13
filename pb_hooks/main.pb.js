/// <reference path="../pb_data/types.d.ts" />

// =============================================================================
// MAIN SORTING API
// =============================================================================

routerAdd("GET", "/api/content/sorted", (c) => {
    console.log("Headers:", c.request().header)
    console.log("Auth header:", c.request().header.get("authorization"))
    
    const authRecord = c.get("authRecord")
    console.log("AuthRecord:", authRecord)
    
    if (!authRecord) {
        console.log("No auth record found!")
        throw new BadRequestError("Authentication required")
    }
    
    const userId = authRecord.id
    const sortType = c.queryParam("sort") || "newest"
    const contentType = c.queryParam("type") || "all"
    const lat = parseFloat(c.queryParam("lat") || "0")
    const lng = parseFloat(c.queryParam("lng") || "0")
    const page = parseInt(c.queryParam("page") || "1")
    const limit = Math.min(parseInt(c.queryParam("limit") || "20"), 50)
    const offset = (page - 1) * limit
    
    console.log(`[API] Sorted content request: userId=${userId}, sort=${sortType}, type=${contentType}`)
    
    try {
        // Check cache first
        const cacheKey = `sorted_${userId}_${sortType}_${contentType}_${lat}_${lng}_${page}_${limit}`
        const cached = getFromCache(cacheKey)
        if (cached) {
            console.log(`[CACHE] Hit for key: ${cacheKey}`)
            return c.json(200, cached)
        }
        
        let results = []
        
        if (contentType === "stories" || contentType === "all") {
            const stories = getSortedStories(userId, sortType, lat, lng, limit, offset)
            results = results.concat(stories.map(story => ({
                ...story,
                content_type: "story"
            })))
        }
        
        if (contentType === "journeys" || contentType === "all") {
            const journeys = getSortedJourneys(userId, sortType, lat, lng, limit, offset)
            results = results.concat(journeys.map(journey => ({
                ...journey,
                content_type: "journey"
            })))
        }
        
        if (contentType === "all") {
            results = sortMixedContent(results, sortType, lat, lng)
            results = results.slice(0, limit)
        }
        
        const response = {
            items: results,
            page: page,
            limit: limit,
            hasMore: results.length === limit,
            sortType: sortType,
            timestamp: new Date().toISOString()
        }
        
        // Cache for 3 minutes
        setToCache(cacheKey, response, 3)
        
        console.log(`[API] Returning ${results.length} items`)
        return c.json(200, response)
        
    } catch (error) {
        console.error("[API ERROR]", error)
        throw new BadRequestError(`Failed to fetch sorted content: ${error.message}`)
    }
}, $apis.requireRecordAuth())

// =============================================================================
// HOTSPOTS API FOR MAP
// =============================================================================

routerAdd("GET", "/api/map/hotspots", (c) => {
    const authRecord = c.get("authRecord")
    if (!authRecord) {
        throw new BadRequestError("Authentication required")
    }
    
    const userId = authRecord.id
    const lat = parseFloat(c.queryParam("lat"))
    const lng = parseFloat(c.queryParam("lng"))
    const radius = parseFloat(c.queryParam("radius") || "10")
    const minItems = parseInt(c.queryParam("min_items") || "2")
    
    if (!lat || !lng) {
        throw new BadRequestError("Latitude and longitude are required")
    }
    
    console.log(`[HOTSPOTS] Request: lat=${lat}, lng=${lng}, radius=${radius}km`)
    
    try {
        const cacheKey = `hotspots_${lat.toFixed(3)}_${lng.toFixed(3)}_${radius}_${minItems}`
        const cached = getFromCache(cacheKey)
        if (cached) {
            return c.json(200, cached)
        }
        
        const hotspots = findHotSpots(userId, lat, lng, radius, minItems)
        
        const response = {
            hotspots: hotspots,
            center: { lat, lng },
            radius: radius,
            count: hotspots.length,
            timestamp: new Date().toISOString()
        }
        
        setToCache(cacheKey, response, 10) // Cache for 10 minutes
        
        return c.json(200, response)
        
    } catch (error) {
        console.error("[HOTSPOTS ERROR]", error)
        throw new BadRequestError(`Failed to find hotspots: ${error.message}`)
    }
}, $apis.requireRecordAuth())

// =============================================================================
// CACHE MANAGEMENT API
// =============================================================================

routerAdd("POST", "/api/cache/clear", (c) => {
    const authRecord = c.get("authRecord")
    if (!authRecord) {
        throw new BadRequestError("Authentication required")
    }
    
    const pattern = c.queryParam("pattern")
    clearCache(pattern)
    
    return c.json(200, {
        message: pattern ? `Cache cleared for pattern: ${pattern}` : "All cache cleared",
        timestamp: new Date().toISOString()
    })
    }, $apis.requireRecordAuth())

// =============================================================================
// CORE FUNCTIONS
// =============================================================================

function getSortedStories(userId, sortType, lat, lng, limit, offset) {
    let baseQuery = `
        SELECT DISTINCT
            s.id,
            s.title,
            s.content,
            s.media,
            s.audio_files,
            s.location,
            s.tags,
            s.privacy,
            s.created,
            s.updated,
            u.id as author_id,
            u.name as author_name,
            u.avatar as author_avatar,
            u.nickname as author_nickname,
            COALESCE(like_counts.count, 0) as like_count,
            COALESCE(comment_counts.count, 0) as comment_count,
            COALESCE(share_counts.count, 0) as share_count,
            COALESCE(save_counts.count, 0) as save_count,
            CASE WHEN f.follower_id IS NOT NULL THEN 1 ELSE 0 END as is_friend_content,
            CASE WHEN sl_user.user_id IS NOT NULL THEN 1 ELSE 0 END as is_liked_by_user,
            CASE WHEN sv_user.user_id IS NOT NULL THEN 1 ELSE 0 END as is_saved_by_user
        FROM stories s
        INNER JOIN users u ON s.user_id = u.id
        LEFT JOIN (
            SELECT story_id, COUNT(*) as count 
            FROM story_likes 
            GROUP BY story_id
        ) like_counts ON s.id = like_counts.story_id
        LEFT JOIN (
            SELECT story_id, COUNT(*) as count 
            FROM comments 
            WHERE story_id IS NOT NULL 
            GROUP BY story_id
        ) comment_counts ON s.id = comment_counts.story_id
        LEFT JOIN (
            SELECT story_id, COUNT(*) as count 
            FROM shares 
            WHERE story_id IS NOT NULL 
            GROUP BY story_id
        ) share_counts ON s.id = share_counts.story_id
        LEFT JOIN (
            SELECT story_id, COUNT(*) as count 
            FROM saves 
            WHERE story_id IS NOT NULL 
            GROUP BY story_id
        ) save_counts ON s.id = save_counts.story_id
        LEFT JOIN followers f ON s.user_id = f.following_id 
            AND f.follower_id = ? 
            AND f.status = 'accepted'
        LEFT JOIN story_likes sl_user ON s.id = sl_user.story_id 
            AND sl_user.user_id = ?
        LEFT JOIN saves sv_user ON s.id = sv_user.story_id 
            AND sv_user.user_id = ?
        WHERE (s.privacy = 'public' OR s.user_id = ? OR f.follower_id IS NOT NULL)
    `
    
    let params = [userId, userId, userId, userId]
    
    // Add sorting
    switch (sortType) {
        case "newest":
            baseQuery += ` ORDER BY s.created DESC`
            break
            
        case "popular":
            baseQuery += ` ORDER BY 
                (COALESCE(like_counts.count, 0) * 1.0 + 
                 COALESCE(comment_counts.count, 0) * 2.0 + 
                 COALESCE(share_counts.count, 0) * 3.0 + 
                 COALESCE(save_counts.count, 0) * 1.5) DESC,
                s.created DESC`
            break
            
        case "trending":
            baseQuery += ` 
                AND s.created >= datetime('now', '-2 days')
                ORDER BY 
                    (COALESCE(like_counts.count, 0) + 
                     COALESCE(comment_counts.count, 0) + 
                     COALESCE(share_counts.count, 0)) DESC,
                    s.created DESC`
            break
            
        case "friends":
            baseQuery += ` 
                AND f.follower_id IS NOT NULL
                ORDER BY s.created DESC`
            break
            
        case "nearby":
            if (lat !== 0 && lng !== 0) {
                baseQuery += `
                    AND s.location IS NOT NULL
                    AND json_extract(s.location, '$.latitude') IS NOT NULL
                    AND json_extract(s.location, '$.longitude') IS NOT NULL
                    ORDER BY 
                        (
                            (json_extract(s.location, '$.latitude') - ?) * 
                            (json_extract(s.location, '$.latitude') - ?) +
                            (json_extract(s.location, '$.longitude') - ?) * 
                            (json_extract(s.location, '$.longitude') - ?)
                        ) ASC`
                params.push(lat, lat, lng, lng)
            } else {
                baseQuery += ` ORDER BY s.created DESC`
            }
            break
            
        default:
            baseQuery += ` ORDER BY s.created DESC`
    }
    
    baseQuery += ` LIMIT ? OFFSET ?`
    params.push(limit + 5, offset)
    
    const records = $app.dao().db()
        .newQuery(baseQuery)
        .bind(...params)
        .all()
    
    return records.map(record => enhanceStoryRecord(record))
}

function getSortedJourneys(userId, sortType, lat, lng, limit, offset) {
    let baseQuery = `
        SELECT DISTINCT
            j.id,
            j.title,
            j.description,
            j.start_date,
            j.end_date,
            j.privacy,
            j.timeline_items,
            j.total_cost,
            j.currency,
            j.cover_image,
            j.created,
            j.updated,
            u.id as author_id,
            u.name as author_name,
            u.avatar as author_avatar,
            u.nickname as author_nickname,
            COALESCE(like_counts.count, 0) as like_count,
            COALESCE(comment_counts.count, 0) as comment_count,
            COALESCE(share_counts.count, 0) as share_count,
            COALESCE(save_counts.count, 0) as save_count,
            CASE WHEN f.follower_id IS NOT NULL THEN 1 ELSE 0 END as is_friend_content,
            CASE WHEN jl_user.user_id IS NOT NULL THEN 1 ELSE 0 END as is_liked_by_user,
            CASE WHEN sv_user.user_id IS NOT NULL THEN 1 ELSE 0 END as is_saved_by_user
        FROM journeys j
        INNER JOIN users u ON j.user_id = u.id
        LEFT JOIN (
            SELECT journey_id, COUNT(*) as count 
            FROM journey_likes 
            GROUP BY journey_id
        ) like_counts ON j.id = like_counts.journey_id
        LEFT JOIN (
            SELECT journey_id, COUNT(*) as count 
            FROM comments 
            WHERE journey_id IS NOT NULL 
            GROUP BY journey_id
        ) comment_counts ON j.id = comment_counts.journey_id
        LEFT JOIN (
            SELECT journey_id, COUNT(*) as count 
            FROM shares 
            WHERE journey_id IS NOT NULL 
            GROUP BY journey_id
        ) share_counts ON j.id = share_counts.journey_id
        LEFT JOIN (
            SELECT journey_id, COUNT(*) as count 
            FROM saves 
            WHERE journey_id IS NOT NULL 
            GROUP BY journey_id
        ) save_counts ON j.id = save_counts.journey_id
        LEFT JOIN followers f ON j.user_id = f.following_id 
            AND f.follower_id = ? 
            AND f.status = 'accepted'
        LEFT JOIN journey_likes jl_user ON j.id = jl_user.journey_id 
            AND jl_user.user_id = ?
        LEFT JOIN saves sv_user ON j.id = sv_user.journey_id 
            AND sv_user.user_id = ?
        WHERE (j.privacy = 'public' OR j.user_id = ? OR f.follower_id IS NOT NULL)
            AND j.is_draft = false
    `
    
    let params = [userId, userId, userId, userId]
    
    switch (sortType) {
        case "newest":
            baseQuery += ` ORDER BY j.created DESC`
            break
        case "duration":
            baseQuery += ` ORDER BY 
                CASE 
                    WHEN j.end_date IS NOT NULL AND j.start_date IS NOT NULL 
                    THEN julianday(j.end_date) - julianday(j.start_date)
                    ELSE 0
                END DESC`
            break
        case "cost":
            baseQuery += ` ORDER BY COALESCE(j.total_cost, 0) DESC`
            break
        default:
            baseQuery += ` ORDER BY 
                (COALESCE(like_counts.count, 0) * 1.0 + 
                 COALESCE(comment_counts.count, 0) * 2.0 + 
                 COALESCE(share_counts.count, 0) * 3.0 + 
                 COALESCE(save_counts.count, 0) * 1.5) DESC,
                j.created DESC`
    }
    
    baseQuery += ` LIMIT ? OFFSET ?`
    params.push(limit + 5, offset)
    
    const records = $app.dao().db()
        .newQuery(baseQuery)
        .bind(...params)
        .all()
    
    return records.map(record => enhanceJourneyRecord(record))
}

function enhanceStoryRecord(record) {
    const ageInHours = (Date.now() - new Date(record.created).getTime()) / (1000 * 60 * 60)
    
    // Parse JSON fields safely
    let media = null
    let location = null
    let tags = null
    let audioFiles = null
    
    try {
        if (record.media) media = JSON.parse(record.media)
        if (record.location) location = JSON.parse(record.location)
        if (record.tags) tags = JSON.parse(record.tags)
        if (record.audio_files) audioFiles = JSON.parse(record.audio_files)
    } catch (e) {
        console.warn("JSON parse error:", e)
    }
    
    const engagementScore = calculateEngagementScore(
        record.like_count || 0,
        record.comment_count || 0,
        record.share_count || 0,
        record.save_count || 0,
        ageInHours
    )
    
    return {
        id: record.id,
        title: record.title,
        content: record.content,
        media: media,
        audio_files: audioFiles,
        location: location,
        tags: tags,
        privacy: record.privacy,
        created: record.created,
        updated: record.updated,
        author: {
            id: record.author_id,
            name: record.author_name,
            avatar: record.author_avatar,
            nickname: record.author_nickname
        },
        stats: {
            likes: record.like_count || 0,
            comments: record.comment_count || 0,
            shares: record.share_count || 0,
            saves: record.save_count || 0
        },
        user_interactions: {
            is_liked: !!record.is_liked_by_user,
            is_saved: !!record.is_saved_by_user
        },
        is_friend_content: !!record.is_friend_content,
        age_in_hours: ageInHours,
        engagement_score: engagementScore
    }
}

function enhanceJourneyRecord(record) {
    const ageInHours = (Date.now() - new Date(record.created).getTime()) / (1000 * 60 * 60)
    
    let timelineItems = null
    try {
        if (record.timeline_items) {
            timelineItems = JSON.parse(record.timeline_items)
        }
    } catch (e) {
        console.warn("JSON parse error:", e)
    }
    
    const engagementScore = calculateEngagementScore(
        record.like_count || 0,
        record.comment_count || 0,
        record.share_count || 0,
        record.save_count || 0,
        ageInHours
    )
    
    return {
        id: record.id,
        title: record.title,
        description: record.description,
        start_date: record.start_date,
        end_date: record.end_date,
        privacy: record.privacy,
        timeline_items: timelineItems,
        total_cost: record.total_cost,
        currency: record.currency,
        cover_image: record.cover_image,
        created: record.created,
        updated: record.updated,
        author: {
            id: record.author_id,
            name: record.author_name,
            avatar: record.author_avatar,
            nickname: record.author_nickname
        },
        stats: {
            likes: record.like_count || 0,
            comments: record.comment_count || 0,
            shares: record.share_count || 0,
            saves: record.save_count || 0
        },
        user_interactions: {
            is_liked: !!record.is_liked_by_user,
            is_saved: !!record.is_saved_by_user
        },
        is_friend_content: !!record.is_friend_content,
        age_in_hours: ageInHours,
        engagement_score: engagementScore
    }
}

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

function calculateEngagementScore(likes, comments, shares, saves, ageInHours) {
    const baseScore = likes * 1.0 + comments * 2.0 + shares * 3.0 + saves * 1.5
    const timeDecay = Math.exp(-ageInHours / 24)
    return Math.round(baseScore * timeDecay * 100) / 100
}

function sortMixedContent(items, sortType, lat, lng) {
    switch (sortType) {
        case "newest":
            return items.sort((a, b) => new Date(b.created) - new Date(a.created))
            
        case "popular":
            return items.sort((a, b) => b.engagement_score - a.engagement_score)
            
        case "trending":
            return items
                .filter(item => item.age_in_hours <= 48)
                .sort((a, b) => b.engagement_score - a.engagement_score)
                
        case "nearby":
            if (lat !== 0 && lng !== 0) {
                return items
                    .filter(item => item.location && item.location.latitude && item.location.longitude)
                    .map(item => ({
                        ...item,
                        distance: calculateDistance(lat, lng, item.location)
                    }))
                    .sort((a, b) => a.distance - b.distance)
            }
            return items.sort((a, b) => new Date(b.created) - new Date(a.created))
            
        default:
            return items.sort((a, b) => new Date(b.created) - new Date(a.created))
    }
}

function findHotSpots(userId, centerLat, centerLng, radius, minItems) {
    const query = `
        SELECT 
            'story' as type, 
            s.id,
            json_extract(s.location, '$.latitude') as lat,
            json_extract(s.location, '$.longitude') as lng,
            s.created,
            s.title,
            COALESCE(like_counts.count, 0) as engagement
        FROM stories s
        LEFT JOIN (
            SELECT story_id, COUNT(*) as count 
            FROM story_likes 
            GROUP BY story_id
        ) like_counts ON s.id = like_counts.story_id
        WHERE s.location IS NOT NULL 
            AND s.privacy = 'public'
            AND json_extract(s.location, '$.latitude') IS NOT NULL
            AND json_extract(s.location, '$.longitude') IS NOT NULL
        
        UNION ALL
        
        SELECT 
            'journey' as type, 
            j.id,
            json_extract(j.timeline_items, '$[0].location.latitude') as lat,
            json_extract(j.timeline_items, '$[0].location.longitude') as lng,
            j.created,
            j.title,
            COALESCE(like_counts.count, 0) as engagement
        FROM journeys j
        LEFT JOIN (
            SELECT journey_id, COUNT(*) as count 
            FROM journey_likes 
            GROUP BY journey_id
        ) like_counts ON j.id = like_counts.journey_id
        WHERE j.timeline_items IS NOT NULL 
            AND j.privacy = 'public'
            AND j.is_draft = false
            AND json_extract(j.timeline_items, '$[0].location.latitude') IS NOT NULL
            AND json_extract(j.timeline_items, '$[0].location.longitude') IS NOT NULL
    `
    
    const allContent = $app.dao().db()
        .newQuery(query)
        .all()
        .filter(item => {
            if (!item.lat || !item.lng) return false
            const distance = calculateDistance(centerLat, centerLng, {
                latitude: item.lat,
                longitude: item.lng
            })
            return distance <= radius
        })
    
    const clusters = clusterByLocation(allContent, 0.8) // 800m clusters
    
    return clusters
        .filter(cluster => cluster.items.length >= minItems)
        .map(cluster => {
            const totalEngagement = cluster.items.reduce((sum, item) => sum + (item.engagement || 0), 0)
            const avgAge = cluster.items.reduce((sum, item) => {
                const age = (Date.now() - new Date(item.created).getTime()) / (1000 * 60 * 60)
                return sum + age
            }, 0) / cluster.items.length
            
            return {
                center: cluster.center,
                item_count: cluster.items.length,
                total_engagement: totalEngagement,
                sample_items: cluster.items.slice(0, 3),
                hotness_score: (cluster.items.length * 2 + totalEngagement) * Math.exp(-avgAge / 48)
            }
        })
        .sort((a, b) => b.hotness_score - a.hotness_score)
        .slice(0, 20) // Top 20 hotspots
}

function clusterByLocation(items, radiusKm) {
    const clusters = []
    const processed = new Set()
    
    for (let i = 0; i < items.length; i++) {
        if (processed.has(i)) continue
        
        const centerItem = items[i]
        const cluster = {
            center: { lat: centerItem.lat, lng: centerItem.lng },
            items: [centerItem]
        }
        
        processed.add(i)
        
        for (let j = i + 1; j < items.length; j++) {
            if (processed.has(j)) continue
            
            const distance = calculateDistance(
                centerItem.lat, 
                centerItem.lng,
                { latitude: items[j].lat, longitude: items[j].lng }
            )
            
            if (distance <= radiusKm) {
                cluster.items.push(items[j])
                processed.add(j)
            }
        }
        
        // Update cluster center to centroid
        if (cluster.items.length > 1) {
            const avgLat = cluster.items.reduce((sum, item) => sum + item.lat, 0) / cluster.items.length
            const avgLng = cluster.items.reduce((sum, item) => sum + item.lng, 0) / cluster.items.length
            cluster.center = { lat: avgLat, lng: avgLng }
        }
        
        clusters.push(cluster)
    }
    
    return clusters
}

function calculateDistance(lat1, lng1, location) {
    if (!location || !location.latitude || !location.longitude) {
        return Infinity
    }
    
    const lat2 = location.latitude
    const lng2 = location.longitude
    
    const R = 6371 // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2)
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
}

// =============================================================================
// SIMPLE CACHE SYSTEM
// =============================================================================

const cache = {
    data: new Map(),
    timeouts: new Map()
}

function setToCache(key, value, ttlMinutes = 5) {
    cache.data.set(key, value)
    
    if (cache.timeouts.has(key)) {
        clearTimeout(cache.timeouts.get(key))
    }
    
    const timeout = setTimeout(() => {
        cache.data.delete(key)
        cache.timeouts.delete(key)
    }, ttlMinutes * 60 * 1000)
    
    cache.timeouts.set(key, timeout)
}

function getFromCache(key) {
    return cache.data.get(key)
}

function clearCache(pattern = null) {
    if (pattern) {
        const keys = Array.from(cache.data.keys()).filter(key => key.includes(pattern))
        keys.forEach(key => {
            cache.data.delete(key)
            if (cache.timeouts.has(key)) {
                clearTimeout(cache.timeouts.get(key))
                cache.timeouts.delete(key)
            }
        })
    } else {
        cache.data.clear()
        cache.timeouts.forEach(timeout => clearTimeout(timeout))
        cache.timeouts.clear()
    }
}

// =============================================================================
// REMOVED HEALTH CHECK ROUTE TO AVOID CONFLICTS
// Route /api/health should only be defined in ONE place
// =============================================================================

console.log("🚀 Custom sorting APIs loaded successfully!")
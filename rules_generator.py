# documentation for DNR rules: https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest
import json

blocked_paths = {
    "x.com": [
        "x.com/i/api/1.1/promoted_content/log.json",
        "proxsee.pscp.tv/api/v2/authorizeToken",
        "api.x.com/1.1/live_pipeline/update_subscriptions",
        "x.com/i/api/1.1/graphql/user_flow.json",
        "x.com/i/api/graphql/*/DataSaverMode*",
        "ads-api.x.com/12/measurement/dcm_local_id",
        "x.com/i/api/graphql/*/SidebarUserRecommendations*",
        "x.com/i/api/graphql/*/useSubscriptionProductDetailsQuery*",
        "x.com/i/api/graphql/*/HomeTimeline*",
        "x.com/i/api/1.1/graphql/error_log.json",
        "x.com/i/api/graphql/*/ExploreSidebar*",
        "x.com/i/api/graphql/*/useStoryTopicQuery*",
    ],
    "chatgpt.com": [
        "chatgpt.com/backend-api/conversation/experimental/generate_autocompletions*"
    ],
    "linkedin.com": [
        "linkedin.com/op*-isDkSX",
        "linkedin.com/li/tscp*",
        "linkedin.com/realtime*",
        "linkedin.com/voyager/api/messaging/dash/presenceStatuses*",
        "linkedin.com/sensorCollect*",
        "linkedin.com/li/track*",
        "linkedin.com/rest/trackObserveApi/trackObserve*",
        "linkedin.com/rest/trackO11yApi/trackO11y*",
        "linkedin.com/rest/trackingApiService/track*",
        "linkedin.com/li/tscp/sct*",
        "linkedin.com/voyager/api/*inSessionRelevanceVoyagerFeedDashClientSignal*",
        "csp_report||linkedin.com/security/csp*",
        "linkedin.com/voyager/api/voyagerLegoDashWidgetImpressionEvents*",
        "dms.licdn.com/playlist/vid/dash*",
    ],
}

blocking_rules = []

index = 1
for k, ps in blocked_paths.items():
    for p in ps:
        pieces = p.split("||")
        resource_types = []

        if len(pieces) == 2:
            resource_type, p = pieces
            resource_types.append(resource_type)
        else:
            resource_types.append("xmlhttprequest") 
        
        blocking_rules.append({
            "id": index,
            "priority": 1,
            "action": { "type": "block" },
            "condition": {
                "urlFilter": p,
                "resourceTypes": resource_types
            }
        })
        index += 1

with open("all-blocking-rules.json", "w+") as f:
    json.dump(blocking_rules, f, indent=4)
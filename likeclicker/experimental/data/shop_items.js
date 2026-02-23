//shop items
const shop_items = {
    lpc: {
        name: "string_lpc_name",
        level: "string_lpc_level",
        description: "string_lpc_desc",
        base_cost: 1000,
        cost_mult: 1.15
    },
    followers: {
        name_singular: "string_follower",
        name_plural: "string_followers",
        description: "string_follower_desc",
        base_cost: 10,
        base_lps: 1,
        cost_mult: 1.1,
        double: {
            name: "string_followers_double",
            description: "string_followers_double_desc",
            cost: 500
        }
    },
    fans: {
        name_singular: "string_fan",
        name_plural: "string_fans",
        description: "string_fan_desc",
        base_cost: 100,
        base_lps: 2,
        cost_mult: 1.1,
        double: {
            name: "string_fans_double",
            description: "string_fans_double_desc",
            cost: 1000
        }
    }
}
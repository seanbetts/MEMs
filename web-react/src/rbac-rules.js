const rules = {
    visitor: {
        static: ["home:visit"]
    },
    user: {
        static: [
            "users:getSelf",
            "home:visit",
            "useraccount:visit"
        ],
        dynamic: {
            "posts:edit": ({ userId, memOwnerId }) => {
                if (!userId || !memOwnerId) return false;
                return userId === memOwnerId;
            }
        }
    },
    admin: {
        static: [
            "users:get",
            "users:getSelf",
            "home:visit",
            "useraccount:visit"
        ]
    }
};

export default rules;
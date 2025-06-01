export let pendingNotificationNavigation: {
    screen: string;
    params?: any;
} | null = null;

export const setPendingNavigation = (
    screen: string,
    params?: any
) => {
    pendingNotificationNavigation = { screen, params };
};

export const consumePendingNavigation = () => {
    const nav = pendingNotificationNavigation;
    pendingNotificationNavigation = null;
    return nav;
};

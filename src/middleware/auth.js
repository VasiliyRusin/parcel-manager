export function auth ({ router, next }) {
    if (router.app.$store.getters['user/isAuthenticated']) {
        return next();
    } else {
        router.replace({ name: 'login' });
    }
}

export function isAdmin ({ router, next }) {
    if (router.app.$store.getters['user/isAdmin']) {
        return next();
    } else {
        router.replace('/');
    }
}

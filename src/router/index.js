import Vue from "vue";
import VueRouter from "vue-router";
import { auth, isAdmin } from "@/middleware/auth";
import List from "../views/List.vue";
import Login from "@/views/Login";
import Form from "@/views/Form";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "list",
        component: List
    },
    {
        path: "/add/",
        name: "add",
        props: { isCreate: true },
        component: Form,
        meta: {
            middleware: [auth, isAdmin]
        }
    },
    {
        path: "/edit/:id",
        name: "edit",
        props: { isCreate: false },
        component: Form,
        meta: {
            middleware: [auth, isAdmin]
        }
    },
    {
        path: "/login/",
        name: "login",
        component: Login
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

function nextFactory (context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    // If no subsequent Middleware exists,
    // the default `next()` callback is returned.
    if (!subsequentMiddleware) return context.next;

    return (...parameters) => {
        // Run the default Vue Router `next()` callback first.
        context.next(...parameters);
        // Then run the subsequent Middleware with a new
        // `nextMiddleware()` callback.
        const nextMiddleware = nextFactory(context, middleware, index + 1);
        subsequentMiddleware({ ...context, next: nextMiddleware });
    };
}

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware)
            ? to.meta.middleware
            : [to.meta.middleware];

        const context = {
            from,
            next,
            router,
            to,
        };
        const nextMiddleware = nextFactory(context, middleware, 1);

        return middleware[0]({ ...context, next: nextMiddleware });
    }

    return next();
});

export default router;
